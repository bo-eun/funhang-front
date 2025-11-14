import React from 'react';
import styles from '@/components/comment/comment.module.css';
import { formatDate } from '../../hooks/utils';

function CommentItem({comment,onDelete,onUpdate}) {
    return (
        <li className={styles.comment_item}>
            <div className={styles.comment_head}>
                <p className={styles.name}>{comment.nickname ?? comment.userId}</p>
                <div className={styles.info}>
                    <span className={styles.date}>{formatDate(comment.createDate)}</span>
                    <div className={styles.btn_box}>
                        <button type="button" onClick={onUpdate}>수정</button>
                        |
                        <button type="button" onClick={onDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <p className={styles.text}>{comment.content}</p>
        </li> 
    );
}

export default CommentItem;