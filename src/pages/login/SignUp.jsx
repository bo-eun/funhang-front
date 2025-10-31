import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import InputForm from "../../components/InputForm";
import BtnForm from "../../components/BtnForm";
import styles from '../../assets/css/login.module.css';

const signUpFields = [
    { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력하세요" },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요" },
    { label: "비밀번호 확인", name: "passwordCk", type: "password", placeholder: "비밀번호를 입력하세요" },
    { label: "이름", name: "username", type: "text", placeholder: "이름을 입력하세요" },
    { label: "이메일", name: "email", type: "text", placeholder: "이메일을 입력하세요" },
    { label: "휴대폰 번호", name: "phone", type: "text", placeholder: "휴대폰 번호를 입력하세요" },
    { label: "닉네임", name: "nickname", type: "text", placeholder: "닉네임을 입력하세요" },
    { label: "생년월일", name: "birth", type: "date", placeholder: "생년월일을 입력하세요" },
];

function SignUp(props) {
    
    const schema = yup.object().shape({
        userId: yup.string().required("아이디를 입력하십시오"),
        password: yup.string().required("비밀번호를 입력하십시오")
            .min(6, "비밀번호는 최소 6자리 이상이어야 합니다"),
        passwordCk: yup.string().required("비밀번호를 입력하십시오")
            .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
        username: yup.string().required("이름을 입력하십시오"),
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
        location.href = '/login';
    };

    return (
        
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <section className={styles.user_loginp_wrap}>
                    {signUpFields.map((field)=>(
                        <InputForm
                        key={field.name}
                        {...field}
                        register={register}
                        error={errors[field.name]}
                        />
                    ))}
                </section>
                <div className={`${styles.top_btn} long_btn_bg`}>
                    <button type="submit" className="btn_50_b">회원가입</button>
                </div>
            </form>
       
    );
}

export default SignUp;
