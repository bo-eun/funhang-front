import React from 'react';
import SearchInput from '../../../components/SearchInput';
import styles from "../../../assets/css/boardList.module.css";
import Item from '../../../components/list/Item';

function AdminProductList(props) {
    return (
        <div>
            <form action="" method="" className={styles.board_search_wrap}>
                <select name="" id="" className="form-select">
                    <option value="">제목</option>
                    <option value="">제목+내용</option>
                </select>
                <select name="" id="" className="form-select">
                    <option value="">제목</option>
                    <option value="">제목+내용</option>
                </select>
                <SearchInput />
            </form>
            <div className={styles.brd_info_wrap}>
                <div className={styles.brd_list_info}>
                    <div className="total">
                        총 <strong>30</strong> 개
                    </div>
                    <Item/>
                </div>
            </div>
        </div>
    );
}

export default AdminProductList;