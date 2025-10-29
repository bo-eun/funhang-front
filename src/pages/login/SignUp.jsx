import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import InputForm from "../../components/InputForm";

function SignUp(props) {
    
    const schema = yup.object().shape({
        userId: yup.string().required("아이디를 입력하십시오"),
        password: yup.string().required("비밀번호를 입력하십시오")
            .min(6, "비밀번호는 최소 6자리 이상이어야 합니다"),
        passwordCk: yup.string().required("비밀번호를 입력하십시오")
            .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
        userName: yup.string().required("이름을 입력하십시오"),
        email: yup.string().required("이메일을 입력하십시오"),
        phone: yup.string().required("휴대폰 번호를 입력하십시오")
            .matches(/^[0-9]+$/, "숫자만 입력 가능합니다")
            .min(10, "10자리 이상 입력해주세요")
            .max(11, "11자리 이하로 입력해주세요"),
        nickname: yup.string().required("닉네임을 입력하십시오"),
        birth: yup.string().required("생년월일을 입력하십시오"),
        
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
        reset();
    };

    return (
        <div className="login-bg login-bg-long">
            <form className="login-wrap" onSubmit={handleSubmit(onSubmit)}>
                <span className="page-title">회원가입</span>
                <section className="user-loginp-wrap">
                    <InputForm
                        label="아이디"
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        name="userId"
                        register={register}
                        error={errors.userId}
                    />
                    <InputForm
                        label="비밀번호"
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
                    <InputForm
                        label="이름"
                        type="text"
                        placeholder="이름을 입력해주세요"
                        name="userName"
                        register={register}
                        error={errors.userName}
                    />
                    <InputForm
                        label="이메일"
                        type="text"
                        placeholder="이메일을 입력해주세요"
                        name="email"
                        register={register}
                        error={errors.email}
                    />
                    <InputForm
                        label="휴대폰 번호"
                        type="text"
                        placeholder="휴대폰 번호를 입력해주세요"
                        name="phone"
                        register={register}
                        error={errors.phone}
                    />
                    <InputForm
                        label="닉네임"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        name="nickname"
                        register={register}
                        error={errors.nickname}
                    />
                    <InputForm
                        label="생년월일"
                        type="date"
                        placeholder="생년월일을 입력해주세요"
                        name="birth"
                        register={register}
                        error={errors.birth}
                    />
                </section>
                <div className="btn-wrap">
                    <button type="submit" className="btn-50">
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
