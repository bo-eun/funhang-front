import React from 'react';
import styles from "@/pages/product/product.module.css";
import Item from '../../components/list/Item';
import SearchInput from '../../components/SearchInput';
import { mockProducts } from '../../hooks/mockProducts';
import { useLocation, useOutletContext, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/product/productApi';
function List(props) {

    const products = mockProducts;

    const { chainId, promoId, categoryId } = useOutletContext();
    
    
        
        const { data,isLoading } = useQuery({
          queryKey: ['crawl', chainId, promoId, categoryId],
          queryFn: async () => {
            const res = await productApi.getChainList(chainId, promoId, categoryId);
            return res?.response?.items || [];
        },
        });
        console.log(data);
        const items = data || [];

    return (
        <section className={styles.list_section}>
            <SearchInput />
            <div className={styles.list_info}>
                <div className='total'>총 <strong>{items.length}</strong> 개</div>
                <select name="" id="" className="form-select">
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <ul className={styles.prd_list}>
                {data?.map((product)=>(
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