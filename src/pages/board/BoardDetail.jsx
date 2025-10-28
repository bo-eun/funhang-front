import React, { useState } from 'react';
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';
import { Link } from 'react-router';
import CommentLayout from '../../components/comment/CommentLayout';

function BoardDetail({title, writer, date, likeCount, content}) {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className='board-title-bg'>
                <p className='board-title'>{title}</p>
                <p>{writer} · {date} · 추천수{likeCount}</p>
            </div>
            <section className='content-bg'>
                <div>{content}</div>
                <div className='brd-btn-bg'>
                    <button type='button'
                        onClick={handleToggle}
                        className='min-link-btn'
                    >
                        추천
                        <img src={isActive?likeOn:likeOff} alt="좋아요 아이콘" />
                    </button>
                    <Link to="/board/update" className='min-link-btn'>수정</Link>
                    <Link to="/board"className='min-link-btn'>목록</Link>
                </div>
            </section>
            <CommentLayout/>
        </>
    );
}

export default BoardDetail;