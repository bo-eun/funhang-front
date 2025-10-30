import React from "react";
import itemImg from "../../assets/img/item.png";
import wishiIcon from "../../assets/img/wish.svg";
import wishiActiveIcon from "../../assets/img/wish_active.svg";
import styles from "../../assets/css/item.module.css";

function Item(props) {
  return (
    <div className={styles.prd_item}>
      <div className={styles.img_box}>
        <div className={styles.event}>1 + 1</div>
        <img src={itemImg} alt="" />
        {/* <button type='button' className='wish_btn'><img src={wishiIcon} alt="" /></button> */}
        <button type="button" className={styles.wish_btn}>
          <img src={wishiActiveIcon} alt="" />
        </button>
      </div>
      <div className={styles.info_box}>
        <span className={styles.category.cu}>CU</span>
        <p className={styles.title}>서울우유 강릉커피</p>
        <p className={styles.price}>2,500원</p>
      </div>
    </div>
  );
}

export default Item;
