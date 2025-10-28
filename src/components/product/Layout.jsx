import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import "../../assets/css/product.css"
import activeIcon from "../../assets/img/sub_cate_active.svg";

function Layout(props) {
    return (
        <Container className='product_cont'>
            <h2>CU</h2>
            <ul className='category_list'>
                <li className='active'>
                    <Link to="">전체상품</Link>
                </li>
                <li>
                    <Link to="">1 + 1 행사</Link>
                </li>
                <li>
                    <Link to="">2 + 1 행사</Link>
                </li>
                
            </ul>
            <Row className='contents'>
                <Col xs={2}>
                    <ul className="sub_category_list">
                        <li className='active'>
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