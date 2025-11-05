import React from 'react';
import styles from "@/pages/product/product.module.css";
import Item from '../../components/list/Item';
import SearchInput from '../../components/SearchInput';
import { mockProducts } from '../../hooks/mockProducts';
import { useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/product/productApi';
function List(props) {
    const products = mockProducts;
    
    const location = useLocation();

    const chainName = location.pathname.split("/")[2]; 
    
        // 1+1 행사
        const { data: onePlusOneProducts, isLoading: onePlusOneLoading } = useQuery({
          queryKey: ['crawl', chainName, 'ONE_PLUS_ONE'],
          queryFn: () => productApi.getChainList(chainName, 'ONE_PLUS_ONE'),
        });
        // 2+1 행사
        const { data: towPlusOneProducts, isLoading: towPlusOneLoading  } = useQuery({
          queryKey: ['crawl', chainName, 'TWO_PLUS_ONE'],
          queryFn: () => productApi.getChainList(chainName, 'TWO_PLUS_ONE'),
        });
        const { data: giftProducts, isLoading: giftLoading  } = useQuery({
          queryKey: ['crawl', chainName, 'GIFT'],
          queryFn: () => productApi.getChainList(chainName, 'GIFT'),
        });

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