import React, { useState } from 'react';
import SearchInput from '../../../components/SearchInput';
import { Link } from 'react-router';
import styles from '../../../assets/css/user.module.css';
import EventIcon from '../../../components/icon/EventIcon';
import ShowModal from '../../../components/ShowModal';

function UserList(props) {
    const [showModal, setshowModal] =useState(false);
    const [useYn, setUseYn] = useState(true);
    const [point, setPoint] = useState(0);
    
    const deleteBtn=()=>{
        const result = confirm('정말 탈퇴로 변경하시겠습니까?');
        if(result){
            setUseYn(false)
            alert('탈퇴에 성공하였습니다.');
        }else{
            return;
        }
        
    }

    const goUpdate=()=>{
        setshowModal(true);
    }
    const handleClose=()=>{
        setshowModal(false);
    }

    const userList =
        { userRole: '관리자', 
            userId: 'userId99', 
            useYn: useYn, 
            userName: '김땡땡', 
            createAt: '2025-10-30',
            email: 'email@email.com',
            nickName: '닉네임99',
            birth: '1999-01-01',
            point: point
        }
    
    return (
        <>
            <form action="" method="" className='base_search_bg'>
                <select name="" id="" className="form-select">
                    <option value="">전체보기</option>
                    <option value="">회원</option>
                    <option value="">관리자</option>
                </select>
                <SearchInput />
            </form>
            <div className={styles.list_wrap}>
                <div className={styles.user_info}>
                    <p className={styles.userRole}>{userList.userRole}</p>
                    <p className={styles.userId}>
                        {userList.userId}
                        {userList.useYn?
                        '':<span className={styles.deleteAcc}>탈퇴</span>
                        }
                    </p>
                    <p className={styles.userName}>{userList.userName}</p>
                    <p className={styles.createAt}>{userList.createAt}</p>
                </div>

                <div className='r_btn_cul'>
                    <button className='min_btn_b' onClick={goUpdate}>수정</button>
                    <button className='min_btn_w'
                            onClick={deleteBtn} 
                            disabled={!userList.useYn} 
                            style={{backgroundColor: userList.useYn ? '' : '#c9c9c9',}}
                    >
                        탈퇴
                    </button>
                </div>
            </div>
            <ShowModal
                show={showModal}
                handleClose={handleClose}
            >
                <h3>회원정보 수정</h3>
                <p>{userList.userId}</p>
                <p>{userList.userName}</p>
                <p>{userList.email}</p>
                <p>{userList.nickName}</p>
                <p>{userList.birth}</p>
                <input value={point} onChange={(e) => setPoint(e.target.value)}></input>
                
            </ShowModal>
        </>
    );
}

export default UserList;