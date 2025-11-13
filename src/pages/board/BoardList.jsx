import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from '@/pages/board/boardList.module.css';
import SearchInput from "../../components/SearchInput";
import Pagination from "@/components/pagination/Pagination";
import { authStore } from "../../store/authStore";
import Table from "../../components/table/Table";
import { useBoard } from "../../hooks/useBoard";

const colWidth = ['50px', '', '160px', '80px', '130px'];
const headers = ['NO', '제목', '글쓴이', '추천 수', '작성 일'];


function BoardList(props) {
    const { userRole } = authStore();
    const { listMutate } = useBoard();
    const isAdmin = userRole === "ADMIN";
    const [chkOn,setChkOn] = useState([]);
    const [selected, setSelected]= useState([]);
    const [columns, setColumns] = useState([]);

    // const [boardList, setBoardList] = useState([
    //     {
    //     id: 1,
    //     title: "맛나다 맛나@",
    //     name: "김땡땡",
    //     likeCount: "5",
    //     date: new Date().toISOString().slice(0, 10),
    //     adminPick: false,
    //     },
    // ]);

    const [boardList, setBoardList] = useState(null);

    // 채택
    const selectBrd=()=>{
        console.log(selected);
        setBoardList((prev) => 
            prev.map(list => {
                if(chkOn.includes(list.id)) {
                    list.adminPick = true;
                }

                return list
            })

        )
        setChkOn([]);
    }

    // 삭제
    const delBrd=()=>{
        setBoardList((prev)=>prev.filter((item)=>!chkOn.includes(item.id)));
        setChkOn([]);
    }

    useEffect(() => {
        const fetchList = async() => {
            //const list = await listMutate.mutateAsync();
            //setBoardList(list);
            // board테이블에 adminPick 들어가야함...
        };
        fetchList();
    }, [])

    useEffect(() => {
        if(boardList) {
            const tableList = boardList?.map((list) => {
                const { adminPick, ...rest } = list; // admin 필드를 제외한 나머지 속성들만 남김
                return rest; // 새로운 객체 반환
            });
            setColumns(tableList); // 새로운 배열로 setColumns 호출
        }
    }, [boardList]);

    console.log(columns)

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
                        총 <strong>{boardList?.length}</strong> 개
                    </div>
                    <select name="" id="" className="form-select">
                        <option value="price">등록순</option>
                        <option value="best">추천순</option>
                    </select>
                </div>
                {isAdmin&&(
                    <>
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
                    columns={columns}
                    isCheckbox={true}
                    data={boardList}
                />
            </section>

            <div className="r_btn">
                <Link to="/board/write" className="min_btn_b">
                    글쓰기
                </Link>
            </div>

            <section className="">
                <Pagination
                    page="0"
                    // totalRows={}
                    pagePerRows = "10"
                    // movePage={}
                />
            </section>
             
        </>
    );
}

export default BoardList;
