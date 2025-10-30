import React from 'react';

function CommentItem({comment,onDelete}) {
    return (
        <li>
            <div className="comment_head">
                <p className="name">{comment.name}</p>
                <div className="info">
                    <span className="date">{comment.date}</span>
                    <div className="btn_box">
                        <button type="button">수정</button>
                        |
                        <button type="button" onClick={onDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <p className="text">{comment.text}</p>
        </li> 
    );
}

export default CommentItem;