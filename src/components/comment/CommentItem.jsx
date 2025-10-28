import React from 'react';

function CommentItem(props) {
    return (
        <div className='comment-item'>
            <div>
                <p>닉네임123</p>
                <p>맛있어요</p>
            </div>
            <div>
                <span>2025-10-25</span>
                <button>수정</button>
                 | 
                <button>삭제</button>
            </div>
        </div>
    );
}

export default CommentItem;