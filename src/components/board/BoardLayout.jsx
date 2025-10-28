import React, { useState } from 'react';
import '../../assets/css/boardList.css';
import BoardDetail from '../../pages/board/BoardDetail';
import BoardList from '../../pages/board/BoardList';
import UpdateBoard from '../../pages/board/UpdateBoard';
import WriteBoard from '../../pages/board/WriteBoard';

function BoardLayout({type,pageTitle}) {
    const [title, setTitle]= useState('맛있는 레시피당');
    const [writer, setWriter]= useState('김땡떙');
    const [date, setDate]= useState('2025.10.25');
    const [likeCount, setLikeCount]= useState('5');
    const [content, setContent]= useState('준비물 : 불닭이다');

    return (
        <div className='board-list-bg'>
            <span className='page-title'>{pageTitle}</span>
            {type === 'list' &&
                <BoardList/>
            }
            {type === 'detail' &&
                <BoardDetail
                    title={title}
                    writer={writer}
                    date={date}
                    likeCount={likeCount}
                    content={content}
                />
            }
            {type === 'update' &&
                <UpdateBoard
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                />
            }
            {type === 'write' &&
                <WriteBoard/>
            }
        </div>
    );
}

export default BoardLayout;