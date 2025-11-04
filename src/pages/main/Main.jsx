import React, { useRef, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import styles from "../../assets/css/main.module.css"
import mainBanner01 from "../../assets/img/main_banner01.svg"
import Item from '../../components/list/Item';
import { Link } from 'react-router';

function Main(props) {

    const [slideTexts, setSlideText] = useState([
        'GS25 10월 이벤트',
        'CU 10월 이벤트',
        '7ELEVEN 10월 이벤트'
    ]);

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
        </Container>
    );
}

export default Main;