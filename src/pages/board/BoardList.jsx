import React, { useCallback, useEffect, useState } from "react";
import { boardStore } from "../../store/boardStore";
import { Link, useLocation, useNavigate } from "react-router";
import styles from '@/pages/board/boardList.module.css';
import SearchInput from "../../components/SearchInput";
import Pagination from "@/components/pagination/Pagination";
import { authStore } from "../../store/authStore";
import Table from "../../components/table/Table";
import { useBoard } from "../../hooks/useBoard";
import { useAdmin } from "../../hooks/useAdmin";
import CustomAlert from "../../components/alert/CustomAlert";

const colWidth = ['50px', '', '160px', '80px', '130px'];
const headers = ['NO', '제목', '글쓴이', '추천 수', '작성 일'];


function BoardList(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const refresh = boardStore((state) => state.refresh);

    const adminPage = location.pathname.split('/').slice(0, 3).join('/') === '/admin/board';

    //총데이터수 넣어주기
    const [totalRows, setTotalRows] = useState(0);
    //이동 된 페이지
    const [currentPage,setCurrentPage]= useState(parseInt(queryParams.get("page")??"0", 10)); 

    const { userRole, isAuthenticated } = authStore();

    const [chkOn,setChkOn] = useState([]);
    const [columns, setColumns] = useState([]);

    const [sortType, setSortType] = useState('create'); // 기본 정렬: 등록순
    const [searchType, setSearchType] = useState('title'); // 기본 검색 타입    
    const [searchQuery, setSearchQuery] = useState('');
    
    const { createMutate, listMutate } = useBoard();
    const { deleteBoardMutate, bestBoardMutate, noticeBoardMutate } = useAdmin();

    const [boardList, setBoardList] = useState([]);

    // 게시글 리스트 가져오기
    const fetchList = async() => {
        const result = await listMutate.mutateAsync({ 
            sort: sortType, 
            searchType,
            keyword: searchQuery,
            page: currentPage,
            size: 10 // pagePerRows와 동일하게
        });
        setBoardList(result.items);
        setTotalRows(result.totalElements);
    };

    // URL 업데이트
    const updateUrl = (params) => {
        Object.entries(params).forEach(([key, value]) => {
            // 빈 문자열도 제거
            if (value != null && value !== '') {
                queryParams.set(key, value);
            } else {
                queryParams.delete(key);
            }
        });
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    // 필터 변경
    const handleFilterChange = (type, value) => {
        if (type === "sort") setSortType(value);
        if (type === "searchType") setSearchType(value);
        updateUrl({ sort: type === "sort" ? value : sortType, searchType: type === "searchType" ? value : searchType });
        setCurrentPage(0);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(0);
        // query가 빈 문자열이면 q 파라미터가 자동으로 제거됨
        updateUrl({ page: 0, sort: sortType, searchType, q: query });
    };

    const isChecked = () => {
        if(chkOn.length <= 0) {
            CustomAlert({
                text: '게시물을 선택해주세요'
            })
            return false;
        }   
        return true;
    }

    // 채택
    const selectBrd = async ()=>{
        if(!isChecked()) return;
        await bestBoardMutate.mutateAsync(chkOn);
        setChkOn([]);
        fetchList();
    }

    // 공지 등록
    const noticeBrd = async () => {
        if(!isChecked()) return;
        await noticeBoardMutate.mutateAsync(chkOn);
        setChkOn([]);
        fetchList();
    }

    // 삭제
    const delBrd= async ()=>{
        if(!isChecked()) return;
        await deleteBoardMutate.mutateAsync(chkOn);
        fetchList();
    }
    //게시글 등록
    const writeHandler = async () => {
        if(!isAuthenticated()){
            CustomAlert({
                text: "로그인 후 이용해주세요."
            })
            return navigate('/login');
        }
        const boardId = await createMutate.mutateAsync();
        navigate(adminPage?`/admin/board/${boardId}/write`:`/board/${boardId}/write`);
    }

    useEffect(() => {
        if(boardList.length > 0) {
            const tableList = boardList?.map((list) => {
                const { brdId, title, userId, likeCount, createDate, ...rest } = list; // admin 필드를 제외한 나머지 속성들만 남김
                return { brdId, title, userId, likeCount, createDate }; // 새로운 객체 반환
            });
            setColumns(tableList); // 새로운 배열로 setColumns 호출
        }
    }, [boardList]);

    useEffect(() => {
        fetchList();
    }, [refresh, sortType, searchType, searchQuery, currentPage]) // searchQuery, currentPage 추가
    
    
    useEffect(() => {
        const sort = queryParams.get("sort") || "create";
        const search = queryParams.get("searchType") || "title";
        const keyword = queryParams.get("q") || "";
        
        setSortType(sort);
        setSearchType(search);
        setSearchQuery(keyword);
    }, [location.search]);

    const movePage = (newPage) => {
        setCurrentPage(newPage);
        updateUrl({ page: newPage, sort: sortType, searchType, q: searchQuery });
    };

    return (
        <>
            <div className='base_search_bg'>
                <select name="" id="" className="form-select" value={searchType} onChange={(e) => handleFilterChange('searchType', e.target.value)} >
                    <option value="title">제목</option>
                    <option value="titlecontents">제목+내용</option>
                </select>
                <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
            <div className={styles.brd_info_wrap}>
                <div className={styles.brd_list_info}>
                    <div className="total">
                        총 <strong>{totalRows}</strong> 개
                    </div>
                    <select name="" id="" className="form-select" value={sortType} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                        <option value="create">등록순</option>
                        <option value="like">추천순</option>
                    </select>
                </div>
                {adminPage &&(
                    <>
                        <button className="min_btn_w" onClick={noticeBrd}>공지</button>
                        <button className="min_btn_w" onClick={selectBrd}>채택</button>
                        <button className="min_btn_w" onClick={delBrd}>삭제</button>
                    </>
                )}
            </div>

            <section className={styles.board_list}>
                <Table 
                    colWidth={colWidth}
                    headers={headers}
                    setCheckedList={setChkOn}
                    checkedList={chkOn}
                    columns={columns}
                    data={boardList}
                    path={adminPage? "/admin/board":"/board"}
                />
            </section>

            <div className="r_btn">
                <button onClick={writeHandler} className="min_btn_b">글쓰기</button>
            </div>

            <section className="">
                <Pagination page={currentPage} totalRows={totalRows} pagePerRows={10} movePage={movePage} />
            </section>
             
        </>
    );
}

export default BoardList;
