import React, { useRef, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import styles from "@/pages/main/main.module.css";
import mainBanner01 from "../../assets/img/main_banner01.svg"
import allImg from '../../assets/img/all.png';
import snackImg from '../../assets/img/snack.png';
import drinkImg from '../../assets/img/drink.png';
import foodImg from '../../assets/img/food.png';
import dailyItemImg from '../../assets/img/dailyItem.png';
import milk from '../../assets/img/item.png';
import Item from '../../components/list/Item';
import { Link } from 'react-router';
import SubLayoutPdc from '../../components/product/SubLayoutPdc';
import { mockProducts } from '../../hooks/mockProducts';

function Main(props) {

    const [slideTexts, setSlideText] = useState([
        'GS25 10월 이벤트',
        'CU 10월 이벤트',
        '7ELEVEN 10월 이벤트'
    ]);
    const categoryList = [
        { name: '전체상품', img: allImg , url: '/category'},
        { name: '과자', img: snackImg },
        { name: '음료수', img: drinkImg },
        { name: '식품', img: foodImg },
        { name: '생활용품', img: dailyItemImg },
    ];

    const products = mockProducts;

    


            
    

    const paginationRef = useRef(null);


    return (
        <Container className={styles.main_cont}>
            <SearchInput />
            
            <div className={styles.swiper_cont}>
                <div className={styles.pagination} ref={paginationRef}></div>
                <Swiper
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    modules={[Pagination]}
                    pagination={{ 
                        el: null,
                        clickable: true,
                        renderBullet: (index, className) => {
                        return `<p class=${className}>${slideTexts[index]}</p>`;
                        },
                    }}
                    onSwiper={(swiper) => {
                        // Swiper가 생성된 이후, pagination DOM을 수동 연결
                        swiper.params.pagination.el = paginationRef.current;
                        swiper.pagination.init();
                        swiper.pagination.render();
                        swiper.pagination.update();
                    }}
                    className={styles.swiper}
                    >
                    <SwiperSlide>
                        <a href="#">
                            <img src={mainBanner01} alt="배너1" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#">
                            <img src={mainBanner01} alt="배너1" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#">
                            <img src={mainBanner01} alt="배너1" />
                        </a>
                    </SwiperSlide>          

                </Swiper>
            </div>
            <SubLayoutPdc
                titleName='인기 행사 상품'
                moreLink='/category?sort=popular'
            >
                <ul className={styles.prd_list}>
                    {products?.map((product)=>(
                        <Item
                        key={product.crawlId} 
                        product={product}
                        />
                    ))}
                </ul>
            </SubLayoutPdc>
            <SubLayoutPdc
                titleName='1 + 1 행사'
                moreLink='/category?sort='
            >
                <ul className={styles.prd_list}>
                    {products?.map((product)=>(
                        <Item
                        key={product.crawlId} 
                        product={product}
                        />
                    ))}
                </ul>
            </SubLayoutPdc>
            <SubLayoutPdc
                titleName='2 + 1 행사'
                moreLink='/category?sort='
            >
                <ul className={styles.prd_list}>
                    {products?.map((product)=>(
                        <Item
                        key={product.crawlId} 
                        product={product}
                        />
                    ))}
                </ul>
            </SubLayoutPdc>
            <SubLayoutPdc
                titleName='카테고리 별'
                moreLink='/category'
            >
                <ul className={styles.cat_list}>
                    {categoryList?.map((category,index)=>(
                        <li key={index} className={styles.cat_item}>
                            <Link to={category.url}>
                                <div className={styles.cat_img_wrap}>
                                    <img src={category.img} alt={`${category.name} 이미지`} />
                                </div>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </SubLayoutPdc>           
        </Container>
    );
}

export default Main;