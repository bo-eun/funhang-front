import React from 'react';
import { Link } from 'react-router';
import styles from '../../assets/css/boardList.module.css';

function BoardListItem({boardItem,selectedId,handleCheck,isAdmin}) {
    
    console.log(selectedId);
    return (
        <tr>
            <td>
                {isAdmin &&(
                    <input 
                        type="checkbox" 
                        id={boardItem.id}
                        onChange={handleCheck}
                    />
                )}
            </td>
            <td>{boardItem.id}</td>
            <td>
                <Link to="/board/detail"
                    className='' 
                    >{boardItem.title}</Link>
                    {selectedId &&(
                    <span className={styles.selectBrd}>채택</span>
                    )}
            </td>
            <td>{boardItem.name}</td>
            <td>{boardItem.likeCount}</td>
            <td>{boardItem.date}</td>
        </tr>
    );
}

export default BoardListItem;