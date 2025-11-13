import React, { useState } from 'react';
import CommentItem from './CommentItem';
import styles from '@/components/comment/comment.module.css';
import BtnForm from '../btn/BtnForm';

function CommentLayout({ comments, onAddComment, onDeleteComment }) {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAddComment(text);
        setText('');
    };
    return (
        
            <section className={styles.comment}>
                <p>댓글 <b>{comments?.length}</b> 개</p>
                <ul className={styles.comment_list}>
                    {comments?.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onDelete={() => onDeleteComment(comment?.id)}
                        />
                    ))}
                </ul>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className={styles.comment_box}>
                        <textarea
                            className={styles.form_text}
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