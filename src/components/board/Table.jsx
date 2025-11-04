import React, { useState } from 'react';
import styles from "../../assets/css/boardList.module.css";

function Table({ headers, data, colWidth, columns=data, isCheckbox=false, setCheckedList, clickColumnBtn=null }) {

    const handleCheck =(id)=>{
        setCheckedList((prev) =>
            prev.includes((id)) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }


    return (
        <table className={`table w-100 ${styles.table}`}>
            {colWidth && 
                <colgroup>
                    { isCheckbox && <col width="40px" /> }
                    { colWidth.map((col) => <col width={col} />) }
                    { clickColumnBtn && <col width="80px" /> }
                </colgroup>
            }
            <thead className='text-center'>
                <tr>
                    { isCheckbox && <th></th> }
                    { headers.map((header, index) => <th key={`th${index}`}>{header}</th>) }
                </tr>
            </thead>
            <tbody>
                {columns?.map((obj, index) => 
                    <tr>
                        { isCheckbox && 
                            <td>
                                <input 
                                    type="checkbox" 
                                    id={obj.id}
                                    onChange={() => handleCheck(obj.id)}
                                />
                            </td> 
                        }
                        {Object.entries(obj)?.map(([key, item]) => {
                            return (
                                <td key={index} className={`${key} ${data?.[index]?.adminPick ? 'pick' : ''}`}>
                                    {item}
                                </td>
                            )
                        }
                        )}
                        { clickColumnBtn && 
                            <td><button type="button" className='btn btn-outline-dark' onClick={clickColumnBtn}>수정</button></td>
                        }
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;