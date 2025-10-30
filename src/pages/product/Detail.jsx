import React, { useEffect } from 'react';
import itemImg from "../../assets/img/item.png";
import shareIcon from "../../assets/img/share_icon.svg";
import Map from "../../components/map/Map";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import CommentLayout from '../../components/comment/CommentLayout';

function Detail(props) {

    const [copiedText, copy] = useCopyToClipboard(); // 클립보드
    const copyUrl = () => {
        copy(window.location);
        alert('주소가 클립보드에 복사되었습니다');
    }

    return (
        <section className='detail_section'>
            <div className="prd_info">
                <div className="img_box">
                    <img src={itemImg} alt="" />
                </div>
                <div className="info_box">
                    <button type="button" className='share_btn' onClick={copyUrl}>
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
                    <Map chainName={"CU"} height="300px" />
                </div>
            </section>
            
            <CommentLayout/>
            
        </section>
    );
}

export default Detail;