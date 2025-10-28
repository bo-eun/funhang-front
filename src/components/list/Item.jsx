import React from 'react';
import itemImg from "../../assets/img/item.png";
import wishiIcon from "../../assets/img/wish.svg";
import wishiActiveIcon from "../../assets/img/wish_active.svg";
import "../../assets/css/item.css";

function Item(props) {
    return (
        <div className='prd_item'>
            <div className="img_box">
                <div className="event">1 +  1</div>
                <img src={itemImg} alt="" />
                {/* <button type='button' className='wish_btn'><img src={wishiIcon} alt="" /></button> */}
                <button type='button' className='wish_btn'><img src={wishiActiveIcon} alt="" /></button>
            </div>
            <div className="info_box">
                <span className="category cu">CU</span>
                <p className="title">서울우유 강릉커피</p>
                <p className="price">2,500원</p>
            </div>
        </div>
    );
}

export default Item;