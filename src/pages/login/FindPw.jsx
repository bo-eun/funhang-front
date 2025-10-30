import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import InputForm from "../../components/InputForm";
import BtnLinkForm from "../../components/BtnLinkForm";
import BtnForm from "../../components/BtnForm";
import ShowModal from "../../components/ShowModal";

function FindPw(props) {
    const [checkPw, setCheckPw] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const updatePw = (e) => {
    //     setIsModalOpen(true);
    // };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findSchema = yup.object().shape({
        userName: yup.string().required("이름을 입력하십시오"),
        userId: yup.string().required("아이디를 입력하십시오"),
    });

    const changePwSchema = yup.object().shape({
        password: yup
        .string()
        .required("비밀번호를 입력하십시오")
        .min(6, "비밀번호는 최소 6자리 이상이어야 합니다"),
        passwordCk: yup
        .string()
        .required("비밀번호를 확인하십시오")
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(checkPw ? changePwSchema : findSchema),
    });

    const onSubmit = (data) => {
        console.log("폼 데이터:", data);
        setCheckPw(true);
        reset();
    };
    return (
        <>
        <div className="login-bg">
        <div className="login-wrap">
            <span className="page-title">
            {checkPw === false ? "비밀번호 찾기" : "비밀번호 변경"}
            </span>
            {/* 비밀번호 찾기 index */}
            {!checkPw && (
                <form className="user-loginp-wrap" onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                label="이름"
                type="text"
                placeholder="이름을 입력해주세요"
                name="userName"
                register={register}
                error={errors.userName}
                />

                <InputForm
                label="아이디"
                type="text"
                placeholder="아이디를 입력해주세요"
                name="userId"
                register={register}
                error={errors.userId}
                />

                <div className="btn-wrap">
                <BtnForm
                    type="submit"
                    className="btn-50"
                    btnName="비밀번호찾기"
                    />
                </div>
            </form>
            )}
            {checkPw && (
                <div className="user-loginp-wrap">
                <InputForm
                label="새 비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                register={register}
                error={errors.password}
                />

                <InputForm
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="passwordCk"
                register={register}
                error={errors.passwordCk}
                />
                <div className="btn-wrap">
                <BtnForm
                    type="button"
                    onClick={handleShow}
                    className="btn-50"
                    btnName="비밀번호 변경"
                    />
                </div>
            </div>
            )}
        </div>
    
        
        {/* {isModalOpen && (
            <div className="modal">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content-list">
            <p>비밀번호가 변경되었습니다.</p>
            <BtnLinkForm
            linkPath="/login"
            className="modal-log-btn"
            btnName="닫기"
            />
            </div>
            </div>
            </div>
            )} */}
        </div>
                {/* 모달 */}
                <ShowModal
                    show={show}
                    handleClose={handleClose}
                    />
            </>
    );
}

export default FindPw;
