import React from 'react';
import SearchInput from '../../../components/SearchInput';
import itemImg from "../../../assets/img/item.png";
import Item from '../../../components/list/Item';
import styles from '../../../assets/css/adminProduct.module.css';
import event from '../../../assets/css/eventIcon.module.css';
import { Link } from 'react-router';
import EventIcon from '../../../components/icon/EventIcon';
import StoreIcon from '../../../components/icon/StoreIcon';

function AdminProductList(props) {

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
            <div className={styles.item_wrap}>
                <div className={styles.item_box}>
                    <img src={itemImg} alt="" />
                </div>
                <div className={styles.info_box}>
                    <div className={styles.icon_wrap}>
                        <StoreIcon
                            name='CU'
                            storeColor='cu'
                        />
                        <EventIcon
                            name='2 + 1'
                            bgColor="two"
                        />
                    </div>
                    <p className={styles.title}>서울우유 강릉커피</p>
                    <p className={styles.evtMonth}>9월행사상품</p>
                </div>
                <span className={styles.price}>2,500원</span>
                <div className='r_btn_cul'>
                    <Link to='/admin/product/update' className='min_btn_b'>수정</Link>
                    <button className='min_btn_w'>삭제</button>
                </div>
            </div>
            <div className={styles.item_wrap}>
                <div className={styles.item_box}>
                    <img src={itemImg} alt="" />
                </div>
                <div className={styles.info_box}>
                    <div className={styles.icon_wrap}>
                        <StoreIcon
                            name='7ELEVEN'
                            storeColor='7eleven'
                        />
                        <EventIcon
                            name='1 + 1'
                            bgColor="one"
                        />
                    </div>
                    <p className={styles.title}>서울우유 강릉커피</p>
                    <p className={styles.evtMonth}>9월행사상품</p>
                </div>
                <span className={styles.price}>2,500원</span>
                <div className='r_btn_cul'>
                    <Link to='/admin/product/update' className='min_btn_b'>수정</Link>
                    <button className='min_btn_w'>삭제</button>
                </div>
            </div>
            <div className={styles.item_wrap}>
                <div className={styles.item_box}>
                    <img src={itemImg} alt="" />
                </div>
                <div className={styles.info_box}>
                    <div className={styles.icon_wrap}>
                        <StoreIcon
                            name='GS25'
                            storeColor='gs25'
                        />
                        <EventIcon
                            name='1 + 1'
                            bgColor="one"
                        />
                    </div>
                    <p className={styles.title}>서울우유 강릉커피</p>
                    <p className={styles.evtMonth}>9월행사상품</p>
                </div>
                <span className={styles.price}>2,500원</span>
                <div className='r_btn_cul'>
                    <Link to='/admin/product/update' className='min_btn_b'>수정</Link>
                    <button className='min_btn_w'>삭제</button>
                </div>
            </div>
        </>
    );
}

export default AdminProductList;