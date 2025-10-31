import React, { useState } from 'react';
import { Link } from 'react-router';
import Pagination from '../../../components/Pagination';
import SearchInput from '../../../components/SearchInput';
import styles from '../../../assets/css/boardList.module.css';
import BoardListItem from '../../../components/board/BoardListItem';

function AdminBoardList(props) {
    const [boardList, setBoardList] = useState([
            {
            id: 1,
            title: "맛나다 맛나",
            name: "김땡땡",
            likeCount: "5",
            date: new Date().toISOString().slice(0, 10),
            },
        ]);
    
    return (
        <>
        <form action="" method="" className={styles.board_search_wrap}>
                    <select name="" id="" className="form-select">
                        <option value="">제목</option>
                        <option value="">제목+내용</option>
                    </select>
                    <SearchInput />
                </form>

                <div className={styles.brd_list_info}>
                    <div className="total">
                        총 <strong>{boardList.length}</strong> 개
                    </div>
                    <select name="" id="" className="form-select">
                        <option value="price">등록순</option>
                        <option value="best">추천순</option>
                    </select>
                </div>

                <section className={styles.board_list}>
                    <table className="table">
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "45%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "20%" }} />
                        </colgroup>
                        <thead className="table-title">
                            <tr>
                                <th>NO</th>
                                <th>제목</th>
                                <th>글쓴이</th>
                                <th>추천 수</th>
                                <th>작성 일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList?.map((item) => (
                                <BoardListItem key={item.id} boardItem={item} />
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
        </>
    );
}

export default AdminBoardList;