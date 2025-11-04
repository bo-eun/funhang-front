import React from 'react';
import styles from "../../assets/css/mypage.module.css"
import Item from '../../components/list/Item';

function WishList(props) {
    return (
        <div className={styles.wish_cont}>
            <h3>찜목록</h3>

            <p className={styles.notice}>
                ※ 행사 기간이 지난 상품은 찜목록에서 삭제됩니다.
            </p>

            <ul className={styles.item_list}>
                <li>
                    <Item  
                        link={""}
                        event={{
                            name: '1 + 1',
                            bgColor: 'one',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: 'CU',
                            storeColor: 'cu',
                        }}
                    />
                </li>
                <li>
                    <Item  
                        link={""}
                        event={{
                            name: '1 + 1',
                            bgColor: 'one',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: 'CU',
                            storeColor: 'cu',
                        }}
                    />
                </li>
                <li>
                    <Item  
                        link={""}
                        event={{
                            name: '1 + 1',
                            bgColor: 'one',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: 'CU',
                            storeColor: 'cu',
                        }}
                    />
                </li>
                <li>
                    <Item  
                        link={""}
                        event={{
                            name: '1 + 1',
                            bgColor: 'one',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: 'CU',
                            storeColor: 'cu',
                        }}
                    />
                </li>
            </ul>
        </div>
    );
}

export default WishList;