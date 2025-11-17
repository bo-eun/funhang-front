 import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';
import CommentLayout from '../../components/comment/CommentLayout';
import 'react-quill-new/dist/quill.snow.css';
import styles from '@/pages/board/boardList.module.css';
import { useBoard } from '../../hooks/useBoard';

function BoardDetail() {
    const [isActive, setIsActive] = useState(false);
    
    // ===== 임시 데이터 (나중에 API로 교체) =====
    const board = {
        title: '맛있다',
        writer: '김땡떙',
        createdAt: '2025-10-25',
        likeCount: 0,
        content: '<p>이것은 <strong>Quill</strong>로 작성된 내용입니다.</p><p>다양한 <em>서식</em>이 <u>적용</u>됩니다.</p><ul><li>리스트도 표시됩니다</li><li>이미지도 보입니다</li></ul>'
    };
    
    const [comments, setComments]=useState([
        { id: 1, name: '김땡땡', date: '2025-10-25', text: '첫 댓글입니다!' },
    ]);
    const [text, setText]=useState('');

    const addComment=(newCommentText)=>{
        const newComment = {
            id: Date.now(),
            name: '닉네임123', // 로그인 사용자 이름
            date: new Date().toISOString().slice(0, 10),
            text: newCommentText,
        };
        setComments([...comments, newComment]);
    }
    const deleteComment = (id) => {
        setComments(comments.filter((c) => c.id !== id));
    };

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className={styles.board_title_bg}>
                {/* 제목 표시 */}
                <p className={styles.board_title_txt}>{board.title}</p>
                <p>{board.writer} · {board.createdAt} · 추천수 {board.likeCount}</p>
            </div>
            <section className={styles.content_bg}>
                {/* Quill로 작성된 HTML 내용 표시 */}
                <div 
                    className={`${styles.content_txt} ql-editor`}
                    dangerouslySetInnerHTML={{ __html: board.content }}
                />
                <div className='short_btn_bg'>
                    <button 
                        type='button'
                        onClick={handleToggle}
                        className={`min_btn_b ${styles.like_btn}`}
                    >
                        <span>추천</span>
                        <img src={isActive ? likeOn : likeOff} alt="좋아요 아이콘" />
                    </button>
                    <Link to="/board/update" className='min_btn_b'>수정</Link>
                    <Link to="/board" className='min_btn_w'>목록</Link>
                </div>
            </section>
            <CommentLayout
                comments={comments}
                onAddComment={addComment}
                onDeleteComment={deleteComment}
            />
        </>
    );
}

export default BoardDetail;


/* 
========================================
API 연결 버전 (나중에 사용)
========================================

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function BoardDetail() {
    const { id } = useParams();
    const [isActive, setIsActive] = useState(false);
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetch(`/api/board/${id}`);
                const data = await response.json();
                setBoard(data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBoard();
    }, [id]);

    if (loading) return <div className={styles.base_list_bg}>로딩중...</div>;
    if (!board) return <div className={styles.base_list_bg}>게시글을 찾을 수 없습니다.</div>;

    return (
        // ... 동일한 JSX
    );
}
*/