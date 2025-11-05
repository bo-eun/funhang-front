import React from 'react';
import styles from "../../assets/css/product.module.css";
import Item from '../../components/list/Item';
import SearchInput from '../../components/SearchInput';
import { mockProducts } from '../../hooks/mockProducts';
function List(props) {
    const products = mockProducts;
    
    return (
        <section className={styles.list_section}>
            <SearchInput />
            <div className={styles.list_info}>
                <div className='total'>총 <strong>30</strong> 개</div>
                <select name="" id="" className="form-select">
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <ul className={styles.prd_list}>
                {products?.map((product)=>(
                    <li>
                        <Item
                        key={product.crawlId} 
                        product={product}
                        />
                    </li>
                ))}
            </ul>
        
        </section>
    );
}

export default List;