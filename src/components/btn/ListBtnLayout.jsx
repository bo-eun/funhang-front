import React from 'react';
import styles from '@/components/btn/btn.module.css';
import ButtonOrLink from './ButtonOrLink';

function ListBtnLayout({children,topBtn, bottomBtn,}) {
    return (
    <div className={styles.list_wrap}>
      {children}
      <div className="r_btn_cul">
        <ButtonOrLink
            isLink={topBtn.type === 'link'}
            to={topBtn.to}
            onClick={topBtn.onClick}
            className="min_btn_b"
            style={topBtn.style}
            disabled={topBtn.disabled}
        >
          {topBtn.name}
        </ButtonOrLink>

        <ButtonOrLink
            isLink={bottomBtn.type === 'link'}
            to={bottomBtn.to}
            onClick={bottomBtn.onClick}
            className="min_btn_w"
            style={bottomBtn.style}
            disabled={bottomBtn.disabled}
        >
          {bottomBtn.name}
        </ButtonOrLink>
      </div>
    </div>
  );
}

export default ListBtnLayout;