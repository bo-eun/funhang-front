import React, { useRef, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import styles from "../../assets/css/main.module.css"
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
                    {products?.map((product)=>(
                        <Item
                            key={product.crawl_id}
                            name={product.product_name}
                            price={product.price}
                            promoType={product.promo_type}
                            store={product.source_chain}
                            image={product.image_url}
                        />
                    ))}
            </SubLayoutPdc>
            
            <section className={`${styles.prd_section} ${styles.best_prd}`}>
                <h2>
                    인기 행사 상품
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className={styles.prd_list}>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '2 + 1',
                                bgColor: 'two',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'GS25',
                                storeColor: 'gs25',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: '7ELEVEN',
                                storeColor: '7eleven',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                </ul>
            </section>

            <section className={`${styles.prd_section} ${styles.best_prd}`}>
                <h2>
                    1+1 행사
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className={styles.prd_list}>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                </ul>
            </section>

            <section className={`${styles.prd_section} ${styles.best_prd}`}>
                <h2>
                    2+1 행사
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className={styles.prd_list}>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                    <li>
                        <Item  
                            link={""}
                            event={{
                                name: '1 + 1',
                                bgColor: 'one',
                                cssPosition: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                            store={{
                                name: 'CU',
                                storeColor: 'cu',
                            }}
                        />
                    </li>
                </ul>
            </section>
            <section className={`${styles.prd_section} ${styles.cat_prd}`}>
                <h2>
                    카테고리 별
                    <Link to="/category">전체보기 {">"}</Link>
                </h2>
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
            </section>            
        </Container>
    );
}

export default Main;