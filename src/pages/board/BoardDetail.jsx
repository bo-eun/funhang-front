 import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';
import CommentLayout from '../../components/comment/CommentLayout';
import 'react-quill-new/dist/quill.snow.css';
import styles from '@/pages/board/boardList.module.css';
import { useBoard } from '../../hooks/useBoard';
import { formatDate } from '../../utils/dateFormat';
import { authStore } from '../../store/authStore';
import CustomAlert from '../../components/alert/CustomAlert';

function BoardDetail() {
    const params = useParams();

    const isAuth = authStore().isAuthenticated();
    const role = authStore().userRole;


    const [isActive, setIsActive] = useState(false);
    const [boardDetail, setBoardDetail] = useState({});
    const { 
        getMutate, 
        deleteMutate,
        bestMutate,
        createCommentMutate, 
        listCommentMutate, 
        updateCommentMutate,
        deleteCommentMutate
     } = useBoard();
    
    const [comments, setComments]=useState([]);

    const fetchBoard = async () => {
      const result = await getMutate.mutateAsync(params.boardId);
      setBoardDetail(result.board);
    }

    const deleteBoard = async () => {
        if(!confirm('게시물을 삭제하시겠습니까?')) return;
        await deleteMutate.mutateAsync(params.boardId);
    }

    const bestBoard = async () => {
        await bestMutate.mutateAsync(params.boardId);
        fetchBoard();
    }

    const fetchComment = async() => {
        const result = await listCommentMutate.mutateAsync(params.boardId);
        setComments(result.items);

    }
    const addComment= async(content)=>{
        if(!isAuth) return CustomAlert({text: '로그인 후 댓글을 이용해주세요.'});
        const formData = new FormData();
        formData.append("contents", content)
        await createCommentMutate.mutateAsync({brdId:params.boardId, formData});
        fetchComment();
    }
    const updateComment = async (commentId, content)=>{
        const formData = new FormData();
        formData.append("contents", content)
        await updateCommentMutate.mutateAsync({commentId, formData});
        fetchComment();
    }
    const deleteComment = async(commentId)=>{
        if(!confirm("댓글을 삭제하시겠습니까?")) return false;
        await deleteCommentMutate.mutateAsync(commentId);
        fetchComment();
    }



  useEffect(() => {
    fetchBoard();
    fetchComment();
  }, [])

  useEffect(() => {
    const active = boardDetail?.isLiked;
    setIsActive(active);
  }, [boardDetail])



  console.log(boardDetail);

    return (
        <>
            <div className={styles.board_title_bg}>
                <p className={styles.board_title_txt}>{boardDetail.title}</p>
                <p>{boardDetail.userId} · {formatDate(boardDetail.createDate, true)} · 추천수 {boardDetail.likeCount}</p>
            </div>
            <section className={styles.content_bg}>
                <div 
                    className={`${styles.content_txt} ql-editor`}
                    dangerouslySetInnerHTML={{ __html: boardDetail.contents }}
                />
                <div className='short_btn_bg'>
                    <button 
                        type='button'
                        onClick={bestBoard}
                        className={`min_btn_b ${styles.like_btn}`}
                    >
                        <span>추천</span>
                        <img src={isActive ? likeOn : likeOff} alt="좋아요 아이콘" />
                    </button>
                    <Link to={`/board/${params.boardId}/write`} className='min_btn_b'>수정</Link>
                    <button type="button" className='min_btn line red' onClick={deleteBoard}>삭제</button>
                    <Link to="/board" className='min_btn_w'>목록</Link>
                </div>
            </section>
            <CommentLayout
                comments={comments}
                add={addComment}
                del={deleteComment}
                update={updateComment}
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