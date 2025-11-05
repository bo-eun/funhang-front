import React from 'react';
import SearchInput from '../../../components/SearchInput';
import styles from '@/pages/admin/product/adminProduct.module.css';
import EventIcon from '../../../components/icon/EventIcon';
import StoreIcon from '../../../components/icon/StoreIcon';
import ListBtnLayout from '../../../components/btn/ListBtnLayout';
import { mockProducts } from '../../../hooks/mockProducts';

function AdminProductList(props) {
    const products = mockProducts;

    return (
        <>
            <form action="" method="" className='base_search_bg'>
                <select name="" id="" className="form-select">
                    <option value="">편의점 별</option>
                    <option value="">CU</option>
                    <option value="">7ELEVEN</option>
                    <option value="">GS25</option>
                </select>
                <select name="" id="" className="form-select">
                    <option value="">카테고리 별</option>
                    <option value="">과자</option>
                    <option value="">아이스크림</option>
                    <option value="">신선식품</option>
                </select>
                <SearchInput />
            </form>

            <div className='brd_list_info'>
                <div className='total'>
                    총 <strong>30</strong> 개
                </div>
            </div>
            {products?.map((product)=>(
                <ListBtnLayout
                    topBtn={{ 
                        type: 'link',
                        to:'/admin/product/update',
                        name: '수정',
                    }}
                    bottomBtn={{ 
                        type: 'button', 
                        name: '삭제',
                    }}
                >
                    <div className={styles.item_box}>
                        <img src={product.imageUrl} alt={product.productName} />
                    </div>
                    <div className={styles.info_box}>
                        <div className={styles.icon_wrap}>
                            <StoreIcon product={product.sourceChain}/>
                            <EventIcon product={product} />
                        </div>
                        <p className={styles.title}>{product.productName}</p>
                        <p className={styles.evtMonth}>9월행사상품</p>
                    </div>
                    <span className={styles.price}>{product.price.toLocaleString()}원</span>
                </ListBtnLayout>
            ))}
            
            
        </>
    );
}

export default AdminProductList;