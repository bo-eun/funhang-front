import React from 'react';
import { Link } from 'react-router';

function WriteBoard(props) {
    return (
        <>
            <div className='board-title-bg'>
                <input type='text'></input>
            </div>
            <section className='content-bg'>
                <span></span>
                <div className='brd-btn-bg'>
                    <button type='submit'>등록</button>
                    <Link to="/board/detail">취소</Link>
                </div>
            </section>   
        </>
    );
}

export default WriteBoard;