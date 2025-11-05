import React from 'react';
import styles from "@/pages/mypage/mypage.module.css";
import Item from '../../components/list/Item';
import { mockProducts } from '../../hooks/mockProducts';

function WishList(props) {
    const products = mockProducts;
    return (
        <div className={styles.wish_cont}>
            <h3>찜목록</h3>

            <p className={styles.notice}>
                ※ 행사 기간이 지난 상품은 찜목록에서 삭제됩니다.
            </p>

            <ul className={styles.item_list}>
                {products?.map((product)=>(
                        <Item
                        key={product.crawlId} 
                        product={product}
                        />
                    ))}
            </ul>
        </div>
    );
}

export default WishList;