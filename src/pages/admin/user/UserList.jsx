import React, { useState } from 'react';
import SearchInput from '../../../components/SearchInput';
import { Link } from 'react-router';
import styles from '@/pages/admin/user/user.module.css';
import ShowModal from '../../../components/modal/ShowModal';
import InputForm from '../../../components/InputForm';
import ListBtnLayout from '../../../components/btn/ListBtnLayout';

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
            point: 1000
        }
    
    return (
        <>
            <div className='base_search_bg'>
                <select name="" id="" className="form-select">
                    <option value="">전체보기</option>
                    <option value="">회원</option>
                    <option value="">관리자</option>
                </select>
                <SearchInput />
            </div>
            
            <ListBtnLayout
                topBtn={{ 
                    type: 'button', 
                    onClick: goUpdate, 
                    name: '수정',
                }}
                bottomBtn={{ 
                    type: 'button', 
                    onClick: deleteBtn,
                    name: '탈퇴',
                    style: {backgroundColor: userList.useYn ? '' : '#c9c9c9',},
                    disabled: !userList.useYn
                }}
            >  
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
            </ListBtnLayout>
            
            <ShowModal
                show={showModal}
                title='회원정보 수정'
                handleClose={handleClose}
                handleEvent={handleClose}
                eventBtnName='수정'
                closeBtnName='닫기'
                className={styles.user_info_form}
            >   
                    <InputForm
                        className={styles.info}
                        label='가입일'
                        readOnly={true}
                        defaultValue={userList.createAt}
                    />
                    <InputForm
                        className={styles.info}
                        label='아이디'
                        readOnly={true}
                        defaultValue={userList.userId}
                    />
                    <InputForm
                        className={styles.info}
                        label='이름'
                        readOnly={true}
                        defaultValue={userList.userName}
                    />
                    <InputForm
                        className={styles.info}
                        label='이메일'
                        readOnly={true}
                        defaultValue={userList.email}
                    />
                    <InputForm
                        className={styles.info}
                        label='닉네임'
                        readOnly={true}
                        defaultValue={userList.nickName}
                    />
                    <InputForm
                        className={styles.info}
                        label='생년월일'
                        readOnly={true}
                        defaultValue={userList.birth}
                    />
                    <InputForm
                        className={styles.info}
                        type='number'
                        label='보유 포인트'
                        readOnly={true}
                        defaultValue={userList.point}
                    />
                    <InputForm
                        className={styles.info}
                        type='number'
                        label='포인트 지급'
                        setValue={(e) => setPoint(Number(e.target.value))}
                    />
                
                
            </ShowModal>
        </>
    );
}

export default UserList;