import React from 'react';

function AdminBoardList(props) {
    
    
    return (
        <div className='board-list-bg'>
            <div className='board-list-wrap'>

            <span className='page-title'>게시판</span>
            
                <form action="" method='' className='board-search-wrap'>
                    <select name="" id="" className='form-select'>
                        <option value="">제목</option>
                        <option value="">제목+내용</option>
                    </select>
                    <SearchInput/>
                </form>
            
            <div className="brd-list-info">
                <div className='total'>총 <strong>30</strong> 개</div>
                <select name="" id="" className='form-select'>
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <section className='board-list'>
                <table className='table'>
                    <colgroup>
                    <col style={{width:'15%'}}/>
                    <col style={{width:'40%'}}/>
                    <col style={{width:'15%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    </colgroup>
                    <thead className=''>
                        <tr>
                            <th>NO</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>작성 일</th>
                            <th>조회 수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                        </tr>
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

export default AdminBoardList;