import React, { useCallback, useEffect, useState } from 'react';
import SearchInput from '../../../components/SearchInput';
import { Link, useNavigate } from 'react-router';
import * as yup from "yup";
import styles from '@/pages/admin/user/user.module.css';
import ShowModal from '../../../components/modal/ShowModal';
import InputForm from '../../../components/InputForm';
import ListBtnLayout from '../../../components/btn/ListBtnLayout';
import { useQuery } from '@tanstack/react-query';
import { adminUserApi } from '../../../api/user/adminUserApi';
import Pagination from '../../../components/pagination/Pagination';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    givePoint: yup.number().required("지급 할 포인트를 입력해주세요"),
    pointReason: yup.string().required("포인트 지급 사유를 입력해주세요"),
});

function UserList(props) {
    const [showModal, setshowModal] =useState(false);
    const [useYn, setUseYn] = useState(true);
    const [point, setPoint] = useState(0);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }} = useForm({
            resolver: yupResolver(schema),
        });

    //페이징
    const queryParams = new URLSearchParams(location.search);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page') ?? '0', 10));

    //활성여부 필터
    const delYnQuery = queryParams.get('delYn') ?? '';
    //검색
    const searchQuery = queryParams.get('searchText') ?? '';

    // 필터 변경 시 URL 업데이트
    const updateUrl = useCallback((newParams) => {
        Object.entries(newParams).forEach(([key, value]) => {
            if (value != null) queryParams.set(key, value);
            else queryParams.delete(key);
        });
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }, [location.pathname, location.search, navigate]);


    const {data} = useQuery({
        queryKey: ['user', searchQuery, delYnQuery],
        queryFn: async()=>adminUserApi.list({
            searchText:searchQuery,
            delYn:delYnQuery
        }),
        keepPreviousData: true,
    })

    useEffect(()=>{
        if(data){
            setUserList(data.content || []);
            setTotalRows(data.total || 0);
        }
    }, [data]);
    
    
    console.log(data);

    // -------------------------
    // 정렬
    // -------------------------
    const sortChange = (e) => {
        const newSort = e.target.value;
        queryParams.set('delYn', newSort);
        queryParams.set('page', 0);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };
    // -------------------------
    // 검색
    // -------------------------
    const handleSearch=(newQuery)=>{
        queryParams.set('q', newQuery);
        queryParams.set('page', 0);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }
    
    const deleteBtn=()=>{
        const result = confirm('정말 탈퇴로 변경하시겠습니까?');
        if(result){
            setUseYn(false)
            alert('탈퇴에 성공하였습니다.');
        }else{
            return;
        }
        
    }

    const goUpdate=(user)=>{
        setSelectedUser(user);
        setshowModal(true);
    }
    const handleClose=()=>{
        setshowModal(false);
    }
    // 페이지 이동 처리
    const movePage = (newPage) => {
        setCurrentPage(newPage);
        updateUrl({ page: newPage });
    };

    
    return (
        <>
            <div className='base_search_bg'>
                <select name="" id="" className="form-select">
                    <option value="">전체보기</option>
                    <option value="">회원</option>
                    <option value="">관리자</option>
                </select>
                <select name="" id="" className="form-select" value={delYnQuery} onChange={sortChange}>
                    <option value="">전체보기</option>
                    <option value="Y">활성</option>
                    <option value="N">탈퇴</option>
                </select>
                <SearchInput onChange={handleSearch} value={searchQuery}/>
            </div>
            
            {userList?.map((user)=>(
                <ListBtnLayout
                    topBtn={{ 
                        type: 'button', 
                        onClick: ()=>goUpdate(user), 
                        name: '정보 보기',
                    }}
                    bottomBtn={{ 
                        type: 'button', 
                        onClick: deleteBtn,
                        name: '비활성',
                        style: {backgroundColor: user.useYn ? '' : '#c9c9c9',},
                        disabled: !user.useYn
                    }}
                >  
                    <div className={styles.user_info}>
                        <p className={styles.userRole}>{user.userRole}</p>
                        <p className={styles.userId}>
                            {user.userId}
                            {user.useYn?
                            '':<span className={styles.deleteAcc}>탈퇴</span>
                        }
                        </p>
                        <p className={styles.userName}>{user.userName}</p>
                        <p className={styles.createAt}>{user.createAt}</p>
                    </div>
                </ListBtnLayout>
            ))}
            
            <ShowModal
                show={showModal}
                title='회원정보 수정'
                handleEvent={handleClose}
                handleClose={handleClose}
                eventBtnName='지급'
                closeBtnName='닫기'
                className={styles.user_info_form}
            >   {selectedUser && (
                    <>
                        <InputForm
                            className={styles.info}
                            label='가입일'
                            readOnly={true}
                            defaultValue={selectedUser.createDate}
                            />
                        <InputForm
                            className={styles.info}
                            label='아이디'
                            readOnly={true}
                            defaultValue={selectedUser.userId}
                            />
                        <InputForm
                            className={styles.info}
                            label='이름'
                            readOnly={true}
                            defaultValue={selectedUser.userName}
                            />
                        <InputForm
                            className={styles.info}
                            label='이메일'
                            readOnly={true}
                            defaultValue={selectedUser.email}
                            />
                        <InputForm
                            className={styles.info}
                            label='닉네임'
                            readOnly={true}
                            defaultValue={selectedUser.nickname}
                            />
                        <InputForm
                            className={styles.info}
                            label='생년월일'
                            readOnly={true}
                            defaultValue={selectedUser.birth}
                            />
                        <InputForm
                            className={styles.info}
                            label='핸드폰 번호'
                            readOnly={true}
                            defaultValue={selectedUser.phone}
                            />
                        <InputForm
                            className={styles.info}
                            type='number'
                            label='보유 포인트'
                            readOnly={true}
                            defaultValue={selectedUser.pointBalance}
                            />
                        <InputForm
                            className={styles.info}
                            type='number'
                            label='포인트 지급'
                            name='givePoint'
                            register={register} 
                            error={errors.givePoint}
                            />
                        <InputForm
                            className={styles.info}
                            type='text'
                            label='포인트 지급 사유'
                            name='pointReason'
                            register={register} 
                            error={errors.pointReason}
                            />
                    
                    </>
                 )}
            </ShowModal>
            <Pagination page={currentPage} totalRows={totalRows} pagePerRows={10} movePage={movePage} />
        </>
    );
}

export default UserList;