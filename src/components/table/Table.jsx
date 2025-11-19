import React, { useEffect, useState } from 'react';
import styles from "./Table.module.css";
import { formatDate } from "../../utils/dateFormat";
import { useNavigate } from 'react-router';

function Table({ headers, data, colWidth, columns=data, useCheckbox=false, checkedList, setCheckedList, clickColumnBtn=null }) {

    const navigate = useNavigate();
    
    const handleCheck =(id)=>{
        setCheckedList((prev) =>
            prev.includes((id)) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }

    return (
        <table className={`table w-100 ${styles.table}`}>
            {colWidth && 
                <colgroup>
                    { useCheckbox && <col width="40px" /> }
                    { colWidth.map((col, index) => <col key={index} width={col} />) }
                    { clickColumnBtn && <col width="80px" /> }
                </colgroup>
            }
            <thead className='text-center'>
                <tr>
                    { useCheckbox && <th></th> }
                    { headers.map((header, index) => <th key={`th${index}`}>{header}</th>) }
                </tr>
            </thead>
            <tbody>
                {columns?.map((obj, index) => 
                    <tr key={index} className={`${data[index]?.noticeYn == "Y" ? 'notice' : ''}`}>
                        { useCheckbox && 
                            <td>
                                <input 
                                    type="checkbox" 
                                    id={obj.brdId}
                                    checked={checkedList?.includes(obj.brdId)}
                                    onChange={() => handleCheck(obj.brdId)}
                                />
                            </td> 
                        }
                        {Object.entries(obj)?.map(([key, item]) => {
                            if(key == 'createDate') item = formatDate(item);
                            const brdId = obj.brdId;

                            return (
                                <td 
                                key={`${key}${index}`} 
                                className={`${key} ${data[index]?.bestYn == "Y" ? 'pick' : ''}`} 
                                onClick={() => navigate(`/board/${brdId}`)}
                                >
                                    {item}
                                </td>
                            )
                        }
                        )}
                        { clickColumnBtn && 
                            <td><button type="button" className='btn btn-outline-dark' onClick={() => clickColumnBtn('update', obj.couponId)}>수정</button></td>
                        }
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;