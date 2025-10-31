import React from 'react';
import styles from "../../assets/css/product.module.css";
import Item from '../../components/list/Item';
import SearchInput from '../../components/SearchInput';
function List(props) {
    return (
        <section className={styles.list_section}>
            <SearchInput />
            <div className={styles.list_info}>
                <div className={styles.total}>총 <strong>30</strong> 개</div>
                <select name="" id="" className="form-select">
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <ul className={styles.prd_list}>
                <li><Item /></li>
                <li><Item /></li>
                <li><Item /></li>
                <li><Item /></li>                                          
            </ul>
        
        </section>
    );
}

export default List;