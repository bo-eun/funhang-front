import React, { useEffect } from "react";
import wishiIcon from "../../assets/img/wish.svg";
import wishiActiveIcon from "../../assets/img/wish_active.svg";
import styles from "@/components/list/item.module.css";
import { Link } from "react-router";
import EventIcon from "../icon/EventIcon";
import StoreIcon from "../icon/StoreIcon";
import { authStore } from "../../store/authStore";
import { wishStore } from "../../store/wishStore";

function Item({ product }) {
  // const toggleWish = wishStore(state => state.toggleWish);
  // const list = wishStore(state => state.list);
  const { list, toggleWish } = wishStore();
  const {isAuthenticated, userRole} = authStore();
  const wishActive = wishStore(state => state.isWish(product.crawlId));
  
  if (!product) return null;

  const handleWishClick = async (e) => {
    e.preventDefault();
    if(!isAuthenticated){
      alert('로그인 후 찜해주세요!');
      return;
    }else if(userRole==="ROLE_ADMIN"){
      alert('관리자는 찜 기능을 이용할 수 없습니다.');
      return;
    }
    await toggleWish(product);
  };

  return (
    <Link
      to={`/product/${product.sourceChain}/${product.promoType}/${product.productType}/${product.crawlId}`}
    >
      <div className={styles.prd_item}>
        <div className={styles.img_box}>
          <EventIcon
            product={product}
            cssPosition="absolute"
            top="10px"
            left="10px"
          />
          {/* 상품 이미지 */}
          <img
            src={product.imageUrl}
            alt={product.productName}
            className={styles.prd_img}
          />
          {/* 찜 버튼 */}
          <button
            type="button"
            className={styles.wish_btn}
            onClick={handleWishClick}
          >
            <img src={wishActive ? wishiActiveIcon : wishiIcon} alt="" />
          </button>
        </div>
        <div className={styles.info_box}>
          <StoreIcon product={product.sourceChain} />
          <p className={styles.title}>{product.productName}</p>
          <p className={styles.price}>{product.price.toLocaleString()}원</p>
        </div>
      </div>
    </Link>
  );
}

export default Item;
