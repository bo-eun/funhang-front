import React, { useState } from 'react';
import { Link } from 'react-router';
import '../../assets/css/Login.css';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '../../components/InputForm';
import BtnForm from '../../components/BtnForm';
import BtnLinkForm from '../../components/BtnLinkForm';

function Login(props) {
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
            location.href = '/';
        };
    return (
        
            <div className='login-bg'>
                <form className="login-wrap" onSubmit={handleSubmit(onSubmit)}>

                <span className='page-title'>로그인</span>
                <section>
                    <div className='user-role-wrap'>
                        <label>
                            <input type="radio" name="role" value="user" 
                                    checked={role === "user"}
                                    onChange={handleChange}/>
                            사용자
                        </label>

                        <label>
                            <input type="radio" name="role" value="admin"
                                    checked={role === "admin"}
                                    onChange={handleChange}/>
                            관리자
                        </label>
                    </div>
                </section>
                <section className='user-loginp-wrap'>
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
                </section>
                <div className='find-wrap'>
                    <Link to="/login/findId">아이디 찾기</Link>
                    <span> | </span>
                    <Link to="/login/findPw">비밀번호 찾기</Link>
                </div>
                <div className='btn-wrap'>
                    <BtnForm
                        type='submit'
                        className='btn-50'
                        btnName='로그인'
                    />
                    <BtnLinkForm
                        linkPath="/login/signUp"
                        className='link-btn-50'
                        btnName='회원가입'
                    />
                </div>

                </form>
            </div>
        
    );
}

export default Login;