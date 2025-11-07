import React, { useState } from "react";
import itemImg from "../../assets/img/item.png";
import wishiIcon from "../../assets/img/wish.svg";
import wishiActiveIcon from "../../assets/img/wish_active.svg";
import styles from "@/components/list/item.module.css";
import { Link } from "react-router";
import EventIcon from "../icon/EventIcon";
import StoreIcon from "../icon/StoreIcon";
import { authStore } from "../../store/authStore";
import { mypageApi } from "../../api/mypage/mypageApi";
import { useWish } from "../../hooks/useWish";
import { useScript } from "@uidotdev/usehooks";
import { useWishStore } from "../../store/wishStore";


function Item({product}) {
  const {plusWishmutation} = useWish();
  const { mutate: add } = plusWishmutation;
  const [myWish,setMyWish]=useState([]);
  const { addWish, removeWish, isWish } = useWishStore();

  //상품이 없으면 바로리턴
  if (!product) return null;
  //로그인유무 사용자id
  const { isAuthenticated} = authStore();

  const wishActive = isWish(product.crawlId);

  const handleClick = () => {
    if (wishActive) {
      removeWish(product.crawlId);
    } else {
      addWish(product);
    }
  };



  const handleWish = (e) => {
    if (!isAuthenticated) {
      alert("로그인후 찜기능을 이용해주세요!");
      return;
    }
    e.preventDefault(); // 링크 클릭 막기
    add(product.crawlId);
  };

  return (
    <Link to={`/product/${product.sourceChain}/${product.promoType}/${product.productType}/${product.crawlId}`}>
    <div className={styles.prd_item}>
      <div className={styles.img_box}>
        <EventIcon
          product={product}
          cssPosition="absolute"
          top="10px"
          left="10px"
        />
        {/* 상품 이미지 */}
        <img src={product.imageUrl} alt={product.productName} className={styles.prd_img}/>
        {/* <button type='button' className='wish_btn'><img src={wishiIcon} alt="" /></button> */}
        {/* 찜 버튼 */} 
        <button type="button" className={styles.wish_btn} onClick={handleClick}>
          <img src={wishActive? wishiActiveIcon:wishiIcon} alt="" />
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
