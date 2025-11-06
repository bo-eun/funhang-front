import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet, useParams, useNavigate, useLocation } from 'react-router';
import styles from "@/pages/product/product.module.css";
import activeIcon from "../../assets/img/sub_cate_active.svg";
import { pageInfo } from '../../hooks/pageTitle';

function Layout() {
    const { sourceChain, promoType, productType } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDetail, setIsDetail] = useState(false);
    const [title, setTitle] = useState("");
    

    // 모든 값 null이면 ALL로
    const chainId = sourceChain?.toUpperCase() || 'ALL';
    const promoId = promoType?.toUpperCase() || 'ALL';
    const categoryId = productType?.toUpperCase() || 'ALL';

    // 자동 리다이렉트 로직
    useEffect(() => {
        let newUrl = null;

        // 1. 편의점만 있고 행사/카테고리 없는 경우
        if (sourceChain && !promoType && !productType) {
            newUrl = `/product/${chainId}/ALL/ALL`;
        }
        // 2. 편의점+행사만 있고 카테고리 없는 경우
        else if (sourceChain && promoType && !productType) {
            newUrl = `/product/${chainId}/${promoId}/ALL`;
        }
        // 3. 행사 선택 시, 카테고리를 ALL로 초기화
        else if (sourceChain && promoType && productType && location.pathname !== `/product/${chainId}/${promoId}/${categoryId}`) {
            newUrl = `/product/${chainId}/${promoId}/ALL`;
        }

        if (newUrl && location.pathname.toUpperCase() !== newUrl) {
            navigate(newUrl, { replace: true });
        }
    }, [sourceChain, promoType, productType, chainId, promoId, categoryId, navigate, location.pathname]);

    // 페이지 title (리다이렉트 중에도 안정적)
    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const firstSegment = `/${pathSegments[1]}/${pathSegments[2]}`;
        const chainTitle = pageInfo[firstSegment]?.title || "";
        setTitle(chainTitle);
    }, [location.pathname]);

    useEffect(() => {
        setIsDetail(location.pathname.includes('/detail'));
    }, [location.pathname]);

    // 행사 유형
    const promoList = [
        { id: 'ALL', name: '전체상품' },
        { id: 'ONE_PLUS_ONE', name: '1+1 행사' },
        { id: 'TWO_PLUS_ONE', name: '2+1 행사' },
    ];

    

    if (chainId === 'GS25' || chainId === 'SEV') {
        promoList.push({ id: 'GIFT', name: '덤 증정' });
        if (chainId === 'SEV') promoList.push({ id: 'DISCOUNT', name: '할인 행사' });
    }
    console.log(chainId);
    

    // 카테고리 목록
    const categoryList = [
        { id: 'ALL', name: '전체' },
        { id: 'SNACK', name: '과자' },
        { id: 'DRINK', name: '음료' },
        { id: 'FOOD', name: '식품' },
        { id: 'LIFE', name: '생활용품' },
    ];

    const outletContext = { chainId, promoId, categoryId };

    return (
        <Container className={styles.product_cont}>
            <h2>{title}</h2>

            <ul className={styles.category_list}>
                {promoList.map((promo) => (
                    <li
                        key={promo.id}
                        className={outletContext.promoId === promo.id ? styles.active : ''}
                    >
                        <Link to={`/product/${chainId}/${promo.id}/ALL`}>{promo.name}</Link>
                    </li>
                ))}
            </ul>

            <Row className={styles.contents}>
                <Col xs={2}>
                    <ul className={`${styles.sub_category_list} ${isDetail ? styles.detail : ''}`}>
                        {categoryList.map((cate) => (
                            <li
                                key={cate.id}
                                className={outletContext.categoryId === cate.id ? styles.active : ''}
                            >
                                <Link to={`/product/${chainId}/${promoId}/${cate.id}`}>
                                    {cate.name}
                                    {outletContext.categoryId === cate.id && (
                                        <img src={activeIcon} alt="active" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col xs={10}>
                    <Outlet context={outletContext} />
                </Col>
            </Row>
        </Container>
    );
}

export default Layout;
