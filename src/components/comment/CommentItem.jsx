import React from 'react';
import styles from '@/components/comment/comment.module.css';

function CommentItem({comment,onDelete}) {
    return (
        <li className={styles.comment_item}>
            <div className={styles.comment_head}>
                <p className={styles.name}>{comment.name}</p>
                <div className={styles.info}>
                    <span className={styles.date}>{comment.date}</span>
                    <div className={styles.btn_box}>
                        <button type="button">수정</button>
                        |
                        <button type="button" onClick={onDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <p className={styles.text}>{comment.text}</p>
        </li> 
    );
}

export default CommentItem;