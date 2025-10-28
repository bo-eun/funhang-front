import React, { useState } from 'react';
import Map from '../../components/map/Map';
import "../../assets/css/store.css"
import searchbtn from "../../assets/img/search_btn.svg"

function Store(props) {

    const [chainName, setChainName] = useState("all");
    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState('');
    const [toggle, setToggle] = useState(false);

    const filter = (e) => {
        setChainName(e.target.value);
    }

    const search = () => {
        setSearchText(inputText);
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
                            <input type="radio" name="chain" id="cu" value="cu" checked={chainName == "cu" && true} onChange={filter} />
                            <label htmlFor="cu">
                                CU
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="chain" id="gs25" value="gs25" checked={chainName == "gs25" && true} onChange={filter} />
                            <label htmlFor="gs25">
                                GS25
                            </label>
                        </li> 
                        <li>
                            <input type="radio" name="chain" id="7eleven" value="7eleven" checked={chainName == "7eleven" && true} onChange={filter} />
                            <label htmlFor="7eleven">
                                7ELEVEN
                            </label>
                        </li>                            
                    </ul>
                </div>
                <button type="button" className='box_toggle_btn' onClick={() => setToggle(prev => !prev)}>
                    <i className="bi bi-caret-right-fill"></i>
                </button>                
            </div>

            <Map chainName={chainName} searchText={searchText} height={"calc(100vh - 100px)"} />
        </div>
    );
}

export default Store;