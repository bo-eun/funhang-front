import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useParams } from 'react-router';
import styles from "@/pages/product/product.module.css";
import activeIcon from "../../assets/img/sub_cate_active.svg";
import { pageInfo } from '../../hooks/pageTitle';

function Layout(props) {
    const { chainId, promoId = "ALL", categoryId = "ALL" } = useParams();
    //대문자통일
    const normalizedParams = {
        chainId: chainId?.toUpperCase(),
        promoId: promoId?.toUpperCase() === "ALL" ? "NONE" : promoId?.toUpperCase(),
        categoryId: categoryId?.toUpperCase() === "ALL" ? "NONE" : categoryId?.toUpperCase(),
    };

    const location = useLocation();
    const [isDetail, setIsDetail] = useState(false);

    const matchKey = Object.keys(pageInfo).find((key) =>
        location.pathname.startsWith(key)
    );
    const title = matchKey ? pageInfo[matchKey].title : ""; 
    
    useEffect(() => {
        setIsDetail(location.pathname.includes('/detail'))
    }, [location.pathname])

    // 행사 유형들
    const promoList = [
        { id: 'all', name: '전체상품' },
        { id: 'ONE_PLUS_ONE', name: '1+1 행사' },
        { id: 'TWO_PLUS_ONE', name: '2+1 행사' },
    ];
    // GS25 / 7ELEVEN 추가 옵션
    if (chainId === 'gs25' || chainId === '7eleven') {
        promoList.push({ id: 'GIFT', name: '덤 증정' });
        if (chainId === '7eleven') promoList.push({ id: 'DISCOUNT', name: '할인 행사' });
    };

    // 카테고리 목록
    const categoryList = [
        { id: 'all', name: '전체' },
        { id: 'SNACK', name: '과자' },
        { id: 'DRINK', name: '음료' },
        { id: 'FOOD', name: '식품' },
        { id: 'LIFE', name: '생활용품' },
    ];
    return (
        <Container className={styles.product_cont}>

            <h2>{title}</h2>

            <ul className={styles.category_list}>
                {promoList.map((promo) => (
                    <li
                        key={promo.id}
                        className={promoId === promo.id ? styles.active : ''}
                    >
                        <Link to={`/product/${chainId}/${promo.id}/all`}>{promo.name}</Link>
                    </li>
                ))}
            </ul>

            <Row className={styles.contents}>
                <Col xs={2}>
                    <ul className={`${styles.sub_category_list} ${isDetail && styles.detail}`}>
                        {categoryList.map((cate) => (
                            <li
                                key={cate.id}
                                className={categoryId === cate.id ? styles.active : ''}
                            >
                                <Link to={`/product/${chainId}/${promoId}/${cate.id}`}>
                                {cate.name}
                                {categoryId === cate.id && <img src={activeIcon} alt="active" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col xs={10}>
                    <Outlet context={normalizedParams}/>
                </Col>
            </Row>

        </Container>
    );
}

export default Layout;