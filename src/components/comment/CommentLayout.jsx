import React, { useState } from 'react';
import CommentItem from './CommentItem';
import '../../assets/css/comment.css';
import BtnForm from '../BtnForm';

function CommentLayout({ comments, onAddComment, onDeleteComment }) {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAddComment(text);
        setText('');
    };
    return (
        
            <section className="comment">
                <p className='comment-count'>댓글 {comments.length}</p>
                <ul>
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onDelete={() => onDeleteComment(comment.id)}
                        />
                    ))}
                </ul>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className='comment_box'>
                        <textarea
                            className="form-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button type='submit'>등록</button>
                        
                    </div>
                </form>
            </section>
        
    );
}

export default CommentLayout;