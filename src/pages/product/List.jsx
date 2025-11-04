import React from 'react';
import styles from "../../assets/css/product.module.css";
import Item from '../../components/list/Item';
import SearchInput from '../../components/SearchInput';
function List(props) {
    return (
        <section className={styles.list_section}>
            <SearchInput />
            <div className={styles.list_info}>
                <div className='total'>총 <strong>30</strong> 개</div>
                <select name="" id="" className="form-select">
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <ul className={styles.prd_list}>
                <li>
                    <Item 
                        link='/product/detail'
                        event={{
                            name: '2 + 1',
                            bgColor: 'two',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: 'GS25',
                            storeColor: 'gs25',
                        }}
                    />
                </li>
                <li>
                    <Item 
                        link='/product/detail'
                        event={{
                            name: '1 + 1',
                            bgColor: 'one',
                            cssPosition: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                        store={{
                            name: '7ELEVEN',
                            storeColor: '7eleven',
                        }}
                    />
                </li>
                <li>
                    <Item 
                        link='/product/detail'
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
                        link='/product/detail'
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
        
        </section>
    );
}

export default List;