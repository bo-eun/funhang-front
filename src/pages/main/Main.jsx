import React, { useEffect, useRef, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import styles from "@/pages/main/main.module.css";
import allImg from '../../assets/img/all.png';
import snackImg from '../../assets/img/snack.png';
import drinkImg from '../../assets/img/drink.png';
import foodImg from '../../assets/img/food.png';
import dailyItemImg from '../../assets/img/dailyItem.png';
import Item from '../../components/list/Item';
import { Link, useNavigate } from 'react-router';
import SubLayoutPdc from '../../components/product/SubLayoutPdc';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/product/productApi';
import { adminApi } from "../../api/banner/bannerAdminApi";

const categoryList = [
  { name: "전체상품", img: allImg, url: "/product/ALL/ALL/ALL" },
  { name: "과자", img: snackImg, url: "/product/ALL/ALL/SNACK" },
  { name: "음료수", img: drinkImg, url: "/product/ALL/ALL/DRINK" },
  { name: "식품", img: foodImg, url: "/product/ALL/ALL/FOOD" },
  { name: "생활용품", img: dailyItemImg, url: "/product/ALL/ALL/LIFE" },
];

function Main(props) {
  const paginationRef = useRef(null);
  const navigate = useNavigate();
  const [bannerList, setBannerList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [promoPop, setPromoPop] = useState([]);
  const [promoOne, setPromoOne] = useState([]);
  const [promoTwo, setPromoTwo] = useState([]);

  const [slideTexts, setSlideTexts] = useState([]);

  const { data: onePlusOne } = useQuery({
    queryKey: ["crawl", "ONE_PLUS_ONE"],
    queryFn: async () => productApi.getPromo5List("ONE_PLUS_ONE"),
  });

    const { data: twoPlusOne } = useQuery({
    queryKey: ['crawl', 'TWO_PLUS_ONE'],
    queryFn: async () =>productApi.getPromo5List('TWO_PLUS_ONE'),
    });

    useEffect(()=>{
        if(onePlusOne?.items && twoPlusOne?.items){
            setPromoOne(onePlusOne.items)
            setPromoTwo(twoPlusOne.items)
        }
    },[onePlusOne,twoPlusOne]);

  // 등록 배너 가져오기
  useEffect(() => {
    const fetchBannerList = async () => {
      const result = await adminApi.useList();
      if (result.status == 200) {
        const bannerTitle = result.response.data.map((banner) => banner.title);
        setBannerList(result.response.data);
        setSlideTexts(bannerTitle);
      }
    };

    fetchBannerList();
  }, []);

  // -------------------------
  // 검색
  // -------------------------
  const handleSearch = (newQuery) => {
    const params = new URLSearchParams(location.search);
    params.set("q", newQuery);
    params.set("page", 0);
    navigate(`/product/ALL/ALL/ALL?${params.toString()}`);
  };

  return (
    <Container className={styles.main_cont}>
      <SearchInput onChange={handleSearch} />

      <div className={styles.swiper_cont}>
        <div className={`${styles.pagination}`} ref={paginationRef}></div>
        {bannerList.length > 0 && (
          <Swiper
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Pagination]}
            pagination={{
              el: null,
              clickable: true,
              renderBullet: (index, className) => {
                const isActive = index === activeIndex ? "active-bullet" : "";
                return `<p class="${className} ${isActive}">${slideTexts[index]}</p>`;
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
            {bannerList.length > 0 &&
              bannerList.map((banner) => (
                <SwiperSlide>
                  {banner.linkUrl ? (
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={banner.imgUrl} alt={banner.title} />
                    </a>
                  ) : (
                    <img src={banner.imgUrl} alt={banner.title} />
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
      {/* <SubLayoutPdc
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
            </SubLayoutPdc> */}
            <SubLayoutPdc
                titleName='1 + 1 행사'
                moreLink='/product/ALL/ONE_PLUS_ONE/ALL'
            >
                <ul className={styles.prd_list}>
                {promoOne?.map((product) => (
                    <Item key={product.crawlId} product={product} />
                ))}
                </ul>
            </SubLayoutPdc>
            <SubLayoutPdc
                titleName='2 + 1 행사'
                moreLink='/product/ALL/TWO_PLUS_ONE/ALL'
            >
                <ul className={styles.prd_list}>
                {promoTwo?.map((product) => (
                    <Item key={product.crawlId} product={product} />
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
