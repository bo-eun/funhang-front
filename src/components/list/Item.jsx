import React from "react";
import itemImg from "../../assets/img/item.png";
import wishiIcon from "../../assets/img/wish.svg";
import wishiActiveIcon from "../../assets/img/wish_active.svg";
import styles from "../../assets/css/item.module.css";
import { Link } from "react-router";
import EventIcon from "../icon/EventIcon";
import StoreIcon from "../icon/StoreIcon";

function Item({product}) {
  if (!product) return null;
  return (
    <Link to={`/${product.sourceChain}/${product.crawlId}`}>
    <div className={styles.prd_item}>
      <div className={styles.img_box}>
        <EventIcon
          product={product}
          cssPosition="absolute"
          top="10px"
          left="10px"
        />
        {/* 상품 이미지 */}
        <img src={product.imageUrl} alt={product.productName} />
        {/* <button type='button' className='wish_btn'><img src={wishiIcon} alt="" /></button> */}
        {/* 찜 버튼 */} 
        <button type="button" className={styles.wish_btn}>
          <img src={wishiActiveIcon} alt="" />
        </button>
      </div>
      <div className={styles.info_box}>
        <StoreIcon
          product={product.sourceChain}
        />
        <p className={styles.title}>{product.productName}</p>
        <p className={styles.price}>{product.price.toLocaleString()}원</p>
      </div>
    </div>
    </Link>
  );
}

export default Item;
