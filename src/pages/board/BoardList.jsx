import React, { useState } from "react";
import { Link } from "react-router";
import styles from "../../assets/css/boardList.module.css";
import SearchInput from "../../components/SearchInput";
import BoardListItem from '../../components/board/BoardListItem';
import Pagination from "../../components/Pagination";
import { authStore } from "../../store/authStore";

function BoardList(props) {
    const {userRole} = authStore();
    const isAdmin = userRole === "ADMIN";
    const [chkOn,setChkOn] = useState([]);
    const [selected, setSelected]= useState([]);

    const [boardList, setBoardList] = useState([
        {
        id: 1,
        title: "맛나다 맛나",
        name: "김땡땡",
        likeCount: "5",
        date: new Date().toISOString().slice(0, 10),
        },
        {
        id: 2,
        title: "맛나다 맛나",
        name: "김땡땡",
        likeCount: "5",
        date: new Date().toISOString().slice(0, 10),
        },
        {
        id: 3,
        title: "맛나다 맛나",
        name: "김땡땡",
        likeCount: "5",
        date: new Date().toISOString().slice(0, 10),
        },
    ]);

    const handleCheck =(id)=>{
        setChkOn((prev) =>
            prev.includes((id)) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }
    const selectBrd=()=>{
        setSelected((prevSelected)=>{
            // chkOn에 있는 ID는 추가, 이미 있으면 그대로
            const newSelected = [...prevSelected];
            chkOn.forEach((id) => {
            if (!newSelected.includes(id)) newSelected.push(id);
            });
             // chkOn에 체크 해제된 ID는 제거
            return newSelected;
        });
        // 체크박스 초기화
        setChkOn([]);
    }

    const delBrd=()=>{
        setBoardList((prev)=>prev.filter((item)=>!chkOn.includes(item.id)));
        setChkOn([]);
    }

    return (
        <div className={styles.board_list_bg}>
            <div className={styles.board_list_wrap}>
                <span className="page_title">게시판</span>

                <form action="" method="" className={styles.board_search_wrap}>
                    <select name="" id="" className="form-select">
                        <option value="">제목</option>
                        <option value="">제목+내용</option>
                    </select>
                    <SearchInput />
                </form>
                <div className={styles.brd_info_wrap}>
                    <div className={styles.brd_list_info}>
                        <div className="total">
                            총 <strong>{boardList.length}</strong> 개
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
                    <table className="table">
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "45%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "20%" }} />
                        </colgroup>
                        <thead className="table-title">
                            <tr>
                                <th></th>
                                <th>NO</th>
                                <th>제목</th>
                                <th>글쓴이</th>
                                <th>추천 수</th>
                                <th>작성 일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList?.map((item) => (
                                <>
                                <BoardListItem
                                    key={item.id}
                                    boardItem={item}
                                    selectedId={selected.includes((item.id))}
                                    handleCheck={() => handleCheck(item.id)}
                                    isAdmin={isAdmin}
                                    />
                                    {console.log(item.id)}
                                    </>
                            ))}
                        </tbody>
                    </table>
                </section>

                <div className="r_btn">
                    <Link to="/board/write" className="min_btn_b">
                        글쓰기
                    </Link>
                </div>

                <section className="">
                    <Pagination
                        page="0"
                        totalRows="2"
                        // movePage={}
                    />
                </section>
            </div>
        </div>
    );
}

export default BoardList;
