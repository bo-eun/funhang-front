import React from 'react';

function CommentItem(props) {
    return (
        <li>
            <div className="comment_head">
                <p className="name">닉네임123</p>
                <div className="info">
                    <span className="date">2025-02-22</span>
                    <div className="btn_box">
                        <button type="button">수정</button>
                        |
                        <button type="button">삭제</button>
                    </div>
                </div>
            </div>
            <p className="text">맛있어요~~~~~~~~~~~~~~~~~</p>
        </li> 
    );
}

export default CommentItem;