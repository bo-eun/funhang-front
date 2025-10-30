import React, { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { Link } from 'react-router';
import Pagination from '../../components/Pagination';
import '../../assets/css/boardList.css';
import BoardListItem from '../../components/board/BoardListItem';

function BoardList(props) {
    
    const [boardList, setBoardList] = useState(
        [
            {   id: 1,
                title: '맛나다 맛나',
                name: '김땡땡',
                likeCount:'5',
                date: new Date().toISOString().slice(0, 10),  
            },
        ]
    );
    
    return (
        <div className='board_list_bg'>
            <div className='board_list_wrap'>

            <span className='page-title'>게시판</span>
            
                <form action="" method='' className='board_search_wrap'>
                    <select name="" id="" className='form-select'>
                        <option value="">제목</option>
                        <option value="">제목+내용</option>
                    </select>
                    <SearchInput/>
                </form>
            
            <div className="brd_list_info">
                <div className='total'>총 <strong>{boardList.length}</strong> 개</div>
                <select name="" id="" className='form-select'>
                    <option value="price">등록순</option>
                    <option value="best">추천순</option>
                </select>
            </div>
            <section className='board_list'>
                <table className='table'>
                    <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'45%'}}/>
                    <col style={{width:'15%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    </colgroup>
                    <thead className='table-title'>
                        <tr>
                            <th>NO</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>추천 수</th>
                            <th>작성 일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boardList?.map((item)=>(
                                <BoardListItem
                                    key={item.id}
                                    boardItem={item}
                                />
                            ))
                        }
                        {/* <tr>
                            <td>1</td>
                            <td>
                                <Link to="/board/detail"
                                    className='' 
                                    >안녕하세요</Link>
                            </td>
                            <td>user_0</td>
                            <td>2025.10.25</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <Link to="/board/detail"
                                    className='' 
                                    >편의점 조합 추천</Link>
                            </td>
                            <td>user_1</td>
                            <td>2025.10.26</td>
                            <td>5</td>
                        </tr> */}
                    </tbody>
                </table>

            </section>
            
            <div className='r-btn'>
                <Link to='/board/write' className='min-link-btn-b'>글쓰기</Link>
            </div>
            
            <section className=''>
                <Pagination
                    page='0'
                    totalRows='2'
                    // movePage={}
                    />
            </section>
            </div>
        </div>
    );
}

export default BoardList;