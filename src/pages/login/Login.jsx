// import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from '@/pages/login/login.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../components/InputForm";
import BtnForm from "../../components/btn/BtnForm";
import BtnLinkForm from "../../components/btn/BtnLinkForm";
import { useState } from "react";
import { authStore } from "../../store/authStore";

const loginFields = [
  { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력하세요" },
  { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요" },
];
function Login() {
    const [role, setRole] = useState("user");
    const { setLogin } = authStore();
    const navigate = useNavigate();

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

         // 임의로 로그인 처리 (더미 토큰)
        const dummyToken = "dummy-token-" + role;

        setLogin({
            token: dummyToken,
            userId: data.userId,
            userName: data.userId,
            userRole: role === "admin" ? "ADMIN" : "USER",
        });
        reset();
        // ✅ 로그인 후 즉시 권한별 페이지 이동
        if (role === "admin") {
        navigate("/admin"); // 관리자면 관리자 페이지
        } else {
        navigate("/"); // 일반 사용자면 메인 페이지
        }
    };
    return (
        <>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <div className={styles.userRole_wrap}>
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

                <div className='long_btn_bg'>
                    <button type="submint" className="btn_50_b">로그인</button>
                    <Link to={"/login/signUp"} className="btn_50_w">회원가입</Link>
                </div>

            </form>
        
        </>
    );
}

export default Login;
