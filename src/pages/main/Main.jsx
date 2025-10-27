import React, { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import "../../assets/css/main.css"
import mainBanner01 from "../../assets/img/main_banner01.svg"
import Item from '../../components/list/Item';
import { Link } from 'react-router';

function Main(props) {

    const [slideTexts, setSlideText] = useState([
        'GS25 10월 이벤트',
        'CU 10월 이벤트',
        '7ELEVEN 10월 이벤트'
    ]);


    return (
        <Container className='main_cont'>
            <SearchInput />
            
            <div className="swiper_cont">
                <div class="pagination"></div>
                <Swiper
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    modules={[Pagination]}
                    pagination={{ 
                        el: ".pagination",
                        clickable: true,
                        renderBullet: (index, className) => {
                        return `<p class="${className}">${slideTexts[index]}</p>`;
                        },
                    }}
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
            
            <section className='prd_section best_prd'>
                <h2>
                    인기 행사 상품
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className='prd_list'>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                </ul>
            </section>

            <section className='prd_section best_prd'>
                <h2>
                    1+1 행사
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className='prd_list'>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                </ul>
            </section>

            <section className='prd_section best_prd'>
                <h2>
                    2+1 행사
                    <Link to="">더보기 {">"}</Link>
                </h2>
                <ul className='prd_list'>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Item />
                        </Link>
                    </li>
                </ul>
            </section>            
        </Container>
    );
}

export default Main;