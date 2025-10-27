import React from 'react';
import Item from '../list/Item';
import SearchInput from '../SearchInput';
import { Link } from 'react-router';

function List(props) {
    return (
        <section className='list_section'>
            <SearchInput />
            <div className="list_info">
                <div className='total'>총 <strong>30</strong> 개</div>
                <select name="" id="" className='form-select'>
                    <option value="price">가격순</option>
                    <option value="best">인기순</option>
                </select>
            </div>
            <ul className='prd_list'>
                <li>
                    <Link to="">
                        <Item />
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <Item />
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <Item />
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <Item />
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <Item />
                    </Link>
                </li>                                                                
            </ul>
        
        </section>
    );
}

export default List;