import React from 'react';
import itemImg from "../../assets/img/item.png";
import shareIcon from "../../assets/img/share_icon.svg";

function Detail(props) {
    return (
        <section className='detail_section'>
            <div className="prd_info">
                <div className="img_box">
                    <img src={itemImg} alt="" />
                </div>
                <div className="info_box">
                    <button type="button" className='share_btn'>
                        <img src={shareIcon} alt="" />
                    </button>
                    <p className="event_text">9월 행사상품</p>
                    <p className="title">
                        상품명
                        <span className="event one">1 + 1</span>
                    </p>
                    <p className="price"><strong>23,000</strong> 원</p>
                </div>
            </div>

            <section className='store'>
                <h3>가까운 편의점 보기</h3>
                <div id="map">
                    지도!
                </div>
            </section>

            <section className="comment">
                <h3>댓글(20)</h3>
                <ul>
                    <li>
                        <div className="comment_head">
                            <p className="name">닉네임123</p>
                            <div className="info">
                                <span className="date">2025-02-22</span>
                                <div className="btn_box">
                                    <button type="button">수정</button>
                                    |
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                        </div>
                        <p className="text">맛있어요~~~~~~~~~~~~~~~~~</p>
                    </li>
                    <li>
                        <div className="comment_head">
                            <p className="name">닉네임123</p>
                            <div className="info">
                                <span className="date">2025-02-22</span>
                                <div className="btn_box">
                                    <button type="button">수정</button>
                                    |
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                        </div>
                        <p className="text">맛있어요~~~~~~~~~~~~~~~~~</p>
                    </li>                    
                </ul>
                <form action="" autoComplete='off'>
                    <div className='comment_box'>
                        <textarea name="" id="" className='form-text'></textarea>
                        <button type="submit" className=''>등록</button>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default Detail;