import React, { useState } from "react";
import { Link } from "react-router";
import '../../assets/css/Login.css';
import BtnForm from "../../components/BtnForm";
import BtnLinkForm from "../../components/BtnLinkForm";
import InputForm from "../../components/InputForm";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FindId(props) {
    const [checkId, setCheckId] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    
    

    const schema = yup.object().shape({
        userName: yup.string().required("이름을 입력하십시오"),
        email: yup.string().required("이메일을 입력하십시오"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    
    const onSubmit = (data) => {
        console.log("폼 데이터:", data);
        setCheckId(true);
        reset();
    };

    return (
        <div className="login-bg">
        <div className="login-wrap">
            <span className="page-title">아이디 찾기</span>
            {/* 아이디 찾기 index */}
            {!checkId && (
                <form className="user-loginp-wrap" onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        label='이름'
                        type="text"
                        placeholder="이름을 입력해주세요"
                        name="userName"
                        register={register}
                        error={errors.userName}
                    />
                    <InputForm
                        label='이메일'
                        type="text"
                        placeholder="이메일을 입력해주세요"
                        name="email"
                        register={register}
                        error={errors.email}
                    />

                    <div className="btn-wrap">
                        <BtnForm
                            type='submit'
                            className='btn-50'
                            btnName='아이디찾기'
                        />
                    </div>
                </form>
            )}
            {checkId &&(
                <div className="user-loginp-wrap">
                    <p className="result-id-txt">
                        회원님의 아이디는 user_99 입니다.
                    </p>
                    <div className='btn-wrap'>
                        <BtnLinkForm
                            linkPath="/login"
                            className='btn-50'
                            btnName='로그인'
                        />
                        <BtnLinkForm
                            linkPath="/login/findPw"
                            className='link-btn-50'
                            btnName='비밀번호 찾기'
                        />
                    </div>
                </div>
            )}
        </div>
        {/* 모달 */}
        {isModalOpen && (
            <div className="modal" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-list">
                    <p>
                        조회된 정보가 없습니다.
                        <br />
                        다시 입력해 주세요.
                    </p>
                    <BtnForm
                        type='submit'
                        onClick={closeModal}
                        className='modal-log-btn'
                        btnName='닫기'
                    />
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default FindId;
