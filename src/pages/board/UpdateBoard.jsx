import React from 'react';
import { Link } from 'react-router';

function UpdateBoard({title, setTitle, content,setContent}) {
     const handleChange = (e) => {
    setTitle(e.target.value); // e.target.value를 상태로 저장
  };
    return (
        <>
            <div className='board-title-bg'>
                <input type='text' value={title} onChange={handleChange}></input>
            </div>
            <section className='content-bg'>
                <span>{content}</span>
                <div className='brd-btn-bg'>
                    <button type='submit'>수정</button>
                    <Link to="/board/detail">취소</Link>
                </div>
            </section>   
        </>
    );
}

export default UpdateBoard;