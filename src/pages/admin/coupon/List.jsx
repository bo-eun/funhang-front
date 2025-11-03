import React, { useEffect, useState } from 'react';
import AdminTableList from '../../../components/admin/AdminTableList';
import ShowModal from '../../../components/ShowModal';
import InputForm from '../../../components/InputForm';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function List(props) {

    const [showModal, setShowModal] = useState(false);
    const [couponList, setCouponList] = useState([]);
    const [currentCoupon, setCurrentCoupon] = useState(null);

    const schema = yup.object().shape({
        couponName: yup.string().required("쿠폰 이름을 입력하십시오"),
        requiredPoint: yup.string().required("차감 포인트를 입력하십시오"),
        couponFile: yup.mixed().required("파일을 선택해주세요")
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


    const openCouponModal = (type, coupon) => {
        if(type == 'update') {
            setShowModal(true)
            setCurrentCoupon(coupon)
            console.log(coupon)
            return;    
        }
        setCurrentCoupon(null);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        setCouponList([
        {
            couponId: 1,
            couponName: '5,000원 쿠폰',
            description: '5,000원 쿠폰입니다.',
            requiredPoint: 5000,
            couponFile: '',
        },
        {
            couponId: 2,
            couponName: '10,000원 쿠폰',
            description: '10,000원 쿠폰입니다.',
            requiredPoint: 10000,
            couponFile: '',
        }
    ]);
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
                <div className="btn_box text-end">
                    <button type="button" className='btn btn-outline-dark px-3 me-2' onClick={openCouponModal}>등록</button>
                    <button type="button" className='btn btn-outline-danger px-3'>삭제</button>
                </div>
                <table className=" table mt-3" id="" name="" autoComplete='false'>
                    <colgroup>
                        <col width="60px" />
                        <col width="70%" />
                    </colgroup>
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>쿠폰 이름</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couponList && couponList.map((coupon, index) => 
                            <AdminTableList 
                                key={`coupon${index}`}
                                text={coupon.couponName} 
                                id={`coupon${index}`} 
                                onClick={() => openCouponModal("update", coupon)} 
                            />
                        )}
                
                    </tbody>
                </table>
            </div>
            <ShowModal show={showModal} handleClose={closeModal} title={currentCoupon ? "쿠폰 수정" : "쿠폰 등록"} isSubmit={true}>
                <form action="" id="" name="">
                    <InputForm 
                        register={register} 
                        label={"쿠폰명"} 
                        placeholder={"쿠폰명을 입력해주세요"}
                        name={"couponName"} 
                        defaultValue={currentCoupon ? currentCoupon.couponName : ''}
                     />
                    <InputForm 
                        register={register} 
                        label={"쿠폰 설명"} 
                        placeholder={"쿠폰 설명을 입력해주세요"} 
                        name={"description"} 
                        defaultValue={currentCoupon ? currentCoupon.description : ''}
                        className='mt-4' 
                    />
                    <InputForm 
                        register={register} 
                        label={"쿠폰 금액"} 
                        placeholder={"쿠폰 발급 시 차감 될 포인트를 입력해주세요"} 
                        name={"requiredPoint"} 
                        defaultValue={currentCoupon ? currentCoupon.requiredPoint : ''}
                        className='mt-4' 
                    />
                    <InputForm 
                        register={register} 
                        type={'file'} 
                        label={"쿠폰 이미지"} 
                        name={"couponFile"} 
                        defaultValue={currentCoupon ? currentCoupon.couponFile : ''}
                        className='mt-4' 
                    />
                </form>
            </ShowModal>
        </>
    );
}

export default List;