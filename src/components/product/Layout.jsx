import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useParams } from 'react-router';
import styles from "../../assets/css/product.module.css";
import activeIcon from "../../assets/img/sub_cate_active.svg";
import { pageInfo } from "../../hooks/pageTitle";

function Layout(props) {
    const locataion = useLocation();
    const [isDetail, setIsDetail] = useState(false);

    const { pathname } = useLocation();
    console.log(pathname)
    const title = pageInfo[pathname]?.title || "";

    useEffect(() => {
        setIsDetail(locataion.pathname.includes('/detail'))
    }, [locataion.pathname])

    return (
        <Container className={styles.product_cont}>
            <h2>{title}</h2>
            <ul className={styles.category_list}>
                <li className={styles.active}>
                    <Link to="">전체상품</Link>
                </li>
                <li>
                    <Link to="">1 + 1 행사</Link>
                </li>
                <li>
                    <Link to="">2 + 1 행사</Link>
                </li>
                
            </ul>
            <Row className={styles.contents}>
                <Col xs={2}>
                    <ul className={`${styles.sub_category_list} ${isDetail && styles.detail}`}>
                        <li className={styles.active}>
                            <Link to="">전체 <img src={activeIcon} /></Link>
                        </li>
                        <li>
                            <Link to="">도시락</Link>                    
                        </li>
                        <li>
                            <Link to="">신선식품</Link>                    
                        </li>
                        <li>
                            <Link to="">과자류</Link>
                        </li>
                        <li>
                            <Link to="">음료</Link>
                        </li>
                        <li>
                            <Link to="">아이스크림</Link>
                        </li>
                    </ul>
                </Col>
                <Col xs={10}>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    );
}

export default Layout;