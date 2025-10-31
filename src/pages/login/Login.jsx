// import React, { useState } from "react";
import { Link } from "react-router";
import styles from "../../assets/css/login.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../components/InputForm";
import BtnForm from "../../components/BtnForm";
import BtnLinkForm from "../../components/BtnLinkForm";
import { useState } from "react";

const loginFields = [
  { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력하세요" },
  { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요" },
];
function Login() {
    
    const [role, setRole] = useState("user");

    const handleChange = (e) => {
        setRole(e.target.value);
    };
    const schema = yup.object().shape({
        userId: yup.string().required("아이디를 입력하십시오"),
        password: yup.string().required("비밀번호를 입력하십시오"),
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
        location.href = "/";
    };
    return (
        <>
            <form  onSubmit={handleSubmit(onSubmit)}>
            <section>
                <div className={styles.user_role_wrap}>
                <label>
                    <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={handleChange}
                    />
                    사용자
                </label>

                <label>
                    <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={handleChange}
                    />
                    관리자
                </label>
                </div>
            </section>
            <section className={styles.user_loginp_wrap}>
                {loginFields.map((field) => (
                    <InputForm
                    key={field.name}
                    {...field}
                    register={register}
                    error={errors[field.name]}
                    />
                ))}
            </section>
            <div className={styles.find_wrap}>
                <Link to="/login/findId">아이디 찾기</Link>
                <span> | </span>
                <Link to="/login/findPw">비밀번호 찾기</Link>
            </div>
            <div className={styles.btn_wrap}>
                <BtnForm type="submit" className='btn_50_b' btnName="로그인" />
                <BtnLinkForm
                linkPath="/login/signUp"
                className='btn_50_w'
                btnName="회원가입"
                />
            </div>
            </form>
        
        </>
    );
}

export default Login;
