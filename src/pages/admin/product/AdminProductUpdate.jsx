import React, { useState } from 'react';
import styles from '../../../assets/css/adminProduct.module.css';
import EventIcon from '../../../components/icon/EventIcon';
import { Link } from 'react-router';
import errorImg from '../../../assets/img/errorImg.png';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const Fields = [
  { label: "상품명", name: "productName", type: "text", placeholder: "상품명을 입력하세요" },
  { label: "가격", name: "price", type: "text", placeholder: "가격을 입력하세요" },
];
function AdminProductUpdate(props) {
    const [viewImg, setViewImg]= useState('');
    const [inputURL,setInputURL]=useState('');

    const handleChange =(e)=>{
        setInputURL(e.target.value);
    }
    const imgSubmit=()=>{
        setViewImg(inputURL);
    }
    const schema = yup.object().shape({
            productName: yup.string().required("상품명을 입력하십시오"),
            price: yup.string().required("가격을 입력하십시오"),
        });

    const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm({
            resolver: yupResolver(schema),
        });
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        imgSubmit(); 
        }
    };

    return (
        <form>
            <div className={styles.content_bg}>
                <div className={styles.view_img_wrap}>
                    {viewImg && 
                        <img src={viewImg} 
                            alt="상품 이미지" 
                            onError={(e) => e.currentTarget.src = errorImg}
                        />
                    }
                </div>
                <div className={styles.r_content}>
                    
                    <label htmlFor="store">편의점</label>
                    <select name="store" id="store" className="form-select">
                        <option value="">CU</option>
                        <option value="">7ELEVEN</option>
                        <option value="">GS25</option>
                    </select>

                    <label htmlFor="category">카테고리</label>
                    <select name="category" id="category" className="form-select">
                        <option value="">과자</option>
                        <option value="">아이스크림</option>
                        <option value="">신선식품</option>
                    </select>
                    
                    <label htmlFor="productName">상품명</label>
                    <input 
                        type="text" 
                        name='productName' 
                        id='productName' 
                        className='form-control'
                    />

                    <label htmlFor="price">가격</label>
                    <input type="text" name='price' id='price' className='form-control'/>

                    <label htmlFor="imgURL">이미지 URL</label>
                    <div className={styles.btn_input}>
                        <input type="text" name='imgURL' id='imgURL' 
                            placeholder="이미지 URL 입력"
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            value={inputURL}
                            className={`${styles.short_input} form-control`}
                        />
                        <button type='button' onClick={imgSubmit}>확인</button>
                    </div>

                    <label htmlFor="">행사정보</label>
                    <div className={styles.event_btn_wrap}>
                        <button type='button'>
                            <EventIcon
                                name='1 + 1'
                                bgColor="one"
                            />
                        </button>
                        <button type='button'>
                            <EventIcon
                                name='2 + 1'
                                bgColor="two"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className='short_btn_bg'>
                <button type='submit' className='min_btn_b'>수정</button>
                <Link to='/admin/product' className='min_btn_w'>목록</Link>
            </div>
        </form>
    );
}

export default AdminProductUpdate;