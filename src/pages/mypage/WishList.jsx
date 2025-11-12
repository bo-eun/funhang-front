import React, { useEffect, useMemo, useState } from 'react';
import styles from "@/pages/mypage/mypage.module.css";
import Item from '../../components/list/Item';
import { mockProducts } from '../../hooks/mockProducts';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishApi } from '../../api/mypage/wishApi';
import Pagination from '../../components/pagination/Pagination';
import { Navigate, useLocation, useNavigate, useOutletContext } from 'react-router';
import { useWish } from '../../hooks/useWish';

function WishList() {
    const { movePage, currentPage, setWishTotal } = useOutletContext();
    const pagePerRow = 12;
    const [wish, setWish]=useState([]);
    // 현재 페이지 상품 slice
    const { wishList } = useWish();

    useEffect(()=>{
        if(wishList){
            setWish(wishList || []);
            setWishTotal(wishList.length || 0);
        }
    },[wishList]);

    return (
        <div className={styles.wish_cont}>
            <h3>찜목록</h3>

            <p className={styles.notice}>
                ※ 행사 기간이 지난 상품은 찜목록에서 삭제됩니다.
            </p>

            <ul className={styles.item_list}>
                {wish && wish.length > 0 ?(
                    wish.map((product) => (
                        <li key={product.crawlId}>
                        <Item
                            key={product.crawlId}
                            product={product}
                        />
                        </li>
                    ))
                    ) : (
                    <p className={styles.none_list}>찜한 상품이 없습니다.</p>
                )}
            </ul>
            {/* <Pagination page={currentPage} totalRows={0} pagePerRows={pagePerRow} movePage={movePage} /> */}
        </div>
    );
}

export default WishList;