import React, { useEffect, useMemo, useState } from 'react';
import styles from "@/pages/mypage/mypage.module.css";
import Item from '../../components/list/Item';
import { mockProducts } from '../../hooks/mockProducts';
import { useQueries, useQuery } from '@tanstack/react-query';
import { wishApi } from '../../api/mypage/wishApi';
import { wishStore } from '../../store/wishStore';
import Pagination from '../../components/pagination/Pagination';
import { Navigate, useLocation, useNavigate, useOutletContext } from 'react-router';

function WishList() {
    const list = wishStore(state => state.list);
    const { movePage, currentPage } = useOutletContext();
    // 현재 페이지 상품 slice
    const pagedList = list.slice(currentPage * 12, (currentPage + 1) * 12);

    return (
        <div className={styles.wish_cont}>
            <h3>찜목록</h3>

            <p className={styles.notice}>
                ※ 행사 기간이 지난 상품은 찜목록에서 삭제됩니다.
            </p>

            <ul className={styles.item_list}>
                {pagedList.length > 0 ? (
                    pagedList.map((product) => (
                        <li key={product.crawlId}>
                        <Item
                            key={product.crawlId}
                            product={product}
                        />
                        </li>
                    ))
                    ) : (
                    <p>찜한 상품이 없습니다.</p>
                )}
            </ul>
            <Pagination page={currentPage} totalRows={list.length} pagePerRows='12' movePage={movePage} />
        </div>
    );
}

export default WishList;