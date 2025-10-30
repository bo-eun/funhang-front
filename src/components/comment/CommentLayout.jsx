import React from 'react';
import CommentItem from './CommentItem';
import '../../assets/css/comment.css';

function CommentLayout(props) {
    return (
        
            <section className="comment">
                <p className='comment-count'>댓글 20</p>
                <ul>
                    <CommentItem/>
                </ul>
                <form action="" autoComplete='off'>
                    <div className='comment_box'>
                        <textarea name="" id="" className='form-text'></textarea>
                        <button type="submit" className=''>등록</button>
                    </div>
                </form>
            </section>
        
    );
}

export default CommentLayout;