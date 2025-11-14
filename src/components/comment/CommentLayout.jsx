import React, { useState } from 'react';
import CommentItem from './CommentItem';
import styles from '@/components/comment/comment.module.css';
import BtnForm from '../btn/BtnForm';
import { useQuery } from '@tanstack/react-query';
import { commentApi } from '../../api/comment/commentApi';
import { useComment } from '../../hooks/useComment';

function CommentLayout({ comments , productId }) {
    const [text, setText] = useState('');
    const {addCommentMutation} = useComment();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return alert('댓글을 입력해주세요');
        onAddComment();
        setText('');
    };

    console.log(text);
    const onAddComment=()=>{
        addCommentMutation.mutate({crawlId:productId,content:text});
    }

    const handleDelete = ()=>{
        alert('')
    }
    const handleUpdate = ()=>{
        alert('')
    }
    return (
        
            <section className={styles.comment}>
                <p>댓글 <b>{comments?.length}</b> 개</p>
                <ul className={styles.comment_list}>
                    {comments?.map((comment) => (
                        <CommentItem
                            key={comment.commentId}
                            comment={comment}
                            onDelete={() => handleDelete(comment?.commentId)}
                            onUpdate={() => handleUpdate(comment?.commentId)}
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