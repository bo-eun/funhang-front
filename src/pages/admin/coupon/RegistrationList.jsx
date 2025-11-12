import React, { useEffect, useState } from 'react';
import ShowModal from '@/components/modal/ShowModal';
import InputForm from '../../../components/InputForm';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router';
import Table from '../../../components/table/Table';
import { useAdmin } from '../../../hooks/useAdmin';

const colWidth = ['60px', '70%'];
const headers = ['NO' ,'쿠폰 이름', '관리'];

function List(props) {

    const [showModal, setShowModal] = useState(false);
    const [couponList, setCouponList] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentCoupon, setCurrentCoupon] = useState(null);

    const { getCouponListMutation, createCouponMutation, updateCouponMutation } = useAdmin();

    const schema = yup.object().shape({
        couponName: yup.string().required("쿠폰 이름을 입력하십시오"),
        requiredPoint: yup.string().required("차감 포인트를 입력하십시오"),
        file: yup.mixed().required("파일을 선택해주세요")
                    .test(
                        "fileSelected",
                        "파일을 선택해주세요",
                        value => value && value.length > 0
                    )
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const openCouponModal = (type, currentId) => {
        // 쿠폰 수정 시 현재 쿠폰정보 가져오기
        if(type == 'update') {
            setShowModal(true)
            setCurrentCoupon(couponList.filter((coupon) => currentId == coupon.couponId)[0])
            return;    
        }
        setCurrentCoupon(null);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    // 쿠폰 등록
    const handleCouponSubmit = handleSubmit(async (formData)=>{
        await createCouponMutation.mutateAsync(formData);
        reset(); // 입력 초기화
        setShowModal(false);
    });

    // 쿠폰 수정
    const handleCouponUpdate = handleSubmit(async (formData)=>{
        const couponId = currentCoupon.couponId;
        //await updateCouponMutation.mutateAsync(couponId, formData);
        //reset(); // 입력 초기화
        //setShowModal(false);
        console.log(formData);
    });


    // 쿠폰 리스트 가져오기
    useEffect(() => {
        const fetchList = async () => {
            const result = await getCouponListMutation.mutateAsync();
            const data = result.data.response.content;
            setCouponList(data);
            
            const columns = data.map((el) => {
                const {couponId, couponName, ...rest} = el;
                return {couponId, couponName};
            });
            setColumns(columns);
        }

        fetchList();
    }, [])



    useEffect(() => {
        if(currentCoupon) {
            reset({
                couponName: currentCoupon.couponName,
                description: currentCoupon.description,
                requiredPoint: currentCoupon.requiredPoint,
            });
        } else {
            reset({
                couponName: '',
                description: '',
                requiredPoint: '',
            });
        }
    }, [currentCoupon, reset]);

    return (
        <>
            <div className='w-50 mx-auto mt-5'>
                <div className="btn_box text-end mb-3">
                    <button type="button" className='btn btn-outline-dark px-3 me-2' onClick={openCouponModal}>등록</button>
                    <button type="button" className='btn btn-outline-danger px-3'>삭제</button>
                    <Link to="/admin/coupon/grant" className='btn btn-dark ms-2'>쿠폰 발급 현황</Link>
                </div>

                <Table 
                    colWidth={colWidth} 
                    data={couponList} 
                    columns={columns}
                    headers={headers} 
                    isCheckbox={true} 
                    setCheckedList={""} 
                    clickColumnBtn={openCouponModal} 
                />
            </div>
            <ShowModal show={showModal} handleClose={closeModal} 
                    title={currentCoupon ? "쿠폰 수정" : "쿠폰 등록"} 
                    handleEvent={currentCoupon ? handleCouponUpdate : handleCouponSubmit}
                    eventBtnName={currentCoupon ? "수정" : "등록"}
                    closeBtnName='닫기'>
                <form action="" id="" name="">
                    <InputForm 
                        register={register} 
                        label={"쿠폰명"} 
                        placeholder={"쿠폰명을 입력해주세요"}
                        name={"couponName"} 

                     />
                    <InputForm 
                        register={register} 
                        label={"쿠폰 설명"} 
                        placeholder={"쿠폰 설명을 입력해주세요"} 
                        name={"description"} 
                        className='mt-4' 
                    />
                    <InputForm 
                        register={register} 
                        label={"쿠폰 금액"} 
                        placeholder={"쿠폰 발급 시 차감 될 포인트를 입력해주세요"} 
                        name={"requiredPoint"} 
                        className='mt-4' 
                    />
                    <label className='file_box' htmlFor='file' style={{
                        display:'flex', 
                        alignItems:'center',
                        justifyContent: 'center',
                        background:'#f7f7f7', 
                        height: '100px',
                        cursor: 'pointer'
                        }}>
                        +
                    </label>
                    <InputForm 
                        register={register} 
                        type={'file'} 
                        id={'file'}
                        label={"쿠폰 이미지"} 
                        name={"file"} 
                        className='mt-4' 
                    />
                </form>
            </ShowModal>
        </>
    );
}

export default List;