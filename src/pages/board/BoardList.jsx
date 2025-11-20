import React, { useEffect, useState } from "react";
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

    const adminPage = location.pathname.split('/').slice(0, 3).join('/') === '/admin/board';

    //총데이터수 넣어주기
    const [totalRows, setTotalRows] = useState(0);
    //이동 된 페이지
    const [currentPage,setCurrentPage]= useState(parseInt(queryParams.get("page")??"0", 10)); 
    

    const { userRole } = authStore();
    const isAdmin = userRole === "ROLE_ADMIN";


    const [chkOn,setChkOn] = useState([]);
    const [columns, setColumns] = useState([]);
    
    const { createMutate, listMutate } = useBoard();
    const { deleteBoardMutate, bestBoardMutate, noticeBoardMutate } = useAdmin();

    const [boardList, setBoardList] = useState([]);

    // 게시글 리스트 가져오기
    const fetchList = async() => {
        const result = await listMutate.mutateAsync();
        setBoardList(result.items);
        // board테이블에 adminPick 들어가야함...
    };

    const isChecked = () => {
        if(chkOn.length <= 0) {
            CustomAlert({
                text: '채택할 게시물을 선택해주세요'
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

    const writeHandler = async () => {
        const boardId = await createMutate.mutateAsync();
        navigate(adminPage?`/admin/board/${boardId}/write`:`/board/${boardId}/write`);
    }

    useEffect(() => {
        fetchList();
    }, [])

    useEffect(() => {
        if(boardList.length > 0) {
            const tableList = boardList?.map((list) => {
                const { brdId, title, userId, likeCount, createDate, ...rest } = list; // admin 필드를 제외한 나머지 속성들만 남김
                return { brdId, title, userId, likeCount, createDate }; // 새로운 객체 반환
            });
            console.log(tableList) 
            setColumns(tableList); // 새로운 배열로 setColumns 호출
        }
    }, [boardList]);

    console.log(columns)

    const movePage =(newPage)=>{
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }

    return (
        <>
            <div className='base_search_bg'>
                <select name="" id="" className="form-select">
                    <option value="">제목</option>
                    <option value="">제목+내용</option>
                </select>
                <SearchInput />
            </div>
            <div className={styles.brd_info_wrap}>
                <div className={styles.brd_list_info}>
                    <div className="total">
                        총 <strong>{boardList.length > 0 ? boardList.length : 0}</strong> 개
                    </div>
                    <select name="" id="" className="form-select">
                        <option value="price">등록순</option>
                        <option value="best">추천순</option>
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
                    useCheckbox={true}
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
