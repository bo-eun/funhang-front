import React from 'react';
import CommentItem from './CommentItem';
import '../../assets/css/comment.css';

function CommentLayout(props) {
    return (
        <section className='comment-list'>
            <p className='comment-info'>댓글(20)</p>
            <CommentItem/>
        </section>
    );
}

export default CommentLayout;