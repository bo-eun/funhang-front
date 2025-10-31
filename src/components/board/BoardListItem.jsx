import React from 'react';
import { Link } from 'react-router';
import styles from '../../assets/css/boardList.module.css';

function BoardListItem({boardItem}) {
    return (
        <tr>
            <td>{boardItem.id}</td>
            <td>
                <Link to="/board/detail"
                    className='' 
                    >{boardItem.title}</Link>
            </td>
            <td>{boardItem.name}</td>
            <td>{boardItem.likeCount}</td>
            <td>{boardItem.date}</td>
        </tr>
    );
}

export default BoardListItem;