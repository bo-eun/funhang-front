import React, { useEffect, useState } from 'react';
import Map from '../../components/map/Map';
import "../../assets/css/store.css"
import searchbtn from "../../assets/img/search_btn.svg"

function Store(props) {

    const [chainName, setChainName] = useState("all");
    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]); // 지도에 보여진 편의점 리스트
    const [toggle, setToggle] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeId, setActiveId] = useState('');

    const filter = (e) => {
        setChainName(e.target.value);
    }

    const search = () => {
        setSearchText(inputText);
    }

    const listClick = (item) => {
        setSelectedItem({...item});
        setActiveId(item.id);
    }

    return (
        <div className='store_cont'>
            <div className={`option_cont ${toggle ? 'on' : ''}`}>
                <div className="option_box">
                    <div className="search_box">
                        <div className='search_box'>
                            <input type="text" name="search" id="search" className='search_input'
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="button" onClick={search}>
                                <img src={searchbtn} alt="검색" />
                            </button>
                        </div>
                    </div>
                    <ul className="chain_list">
                        <li>
                            <input type="radio" name="chain" id="chainAll" value="all" checked={chainName == "all" && true} onChange={filter} />
                            <label htmlFor="chainAll">
                                전체
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="chain" id="cu" value="CU" checked={chainName == "cu" && true} onChange={filter} />
                            <label htmlFor="cu">
                                CU
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="chain" id="gs25" value="GS25" checked={chainName == "gs25" && true} onChange={filter} />
                            <label htmlFor="gs25">
                                GS25
                            </label>
                        </li> 
                        <li>
                            <input type="radio" name="chain" id="7eleven" value="세븐일레븐" checked={chainName == "7eleven" && true} onChange={filter} />
                            <label htmlFor="7eleven">
                                7ELEVEN
                            </label>
                        </li>                            
                    </ul>

                    <div className="search_list_cont">
                        <ul className='search_list'>
                            {list?.length > 0 && list.map((item) => {
                                return <li key={`${chainName}${item.id}`} onClick={() => listClick(item)} className={activeId === item.id ? "active" : ""}>
                                    <span className={`chain_title chain_${item.category_name}`}>
                                        {item.category_name}
                                    </span>
                                    <p className="title">
                                        {item.place_name}
                                    </p>
                                    <p className="addr">
                                        {item.road_address_name}
                                    </p>
                                    {item.phone && 
                                        <p className="call">
                                            {item.phone}
                                        </p>
                                    }
                                    
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <button type="button" className='box_toggle_btn' onClick={() => setToggle(prev => !prev)}>
                    <i className={`bi bi-caret-${toggle ? 'right' : 'left'}-fill`}></i>
                </button>                
            </div>

            <Map chainName={chainName} searchText={searchText} setList={setList} height={"calc(100vh - 100px)"} selectedItem={selectedItem} />
        </div>
    );
}

export default Store;