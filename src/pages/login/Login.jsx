import React, { useState } from 'react';
import { Link } from 'react-router';
import '../../assets/css/Login.css';

function Login(props) {
    const [role, setRole] = useState("user");

    const handleChange = (e) => {
        setRole(e.target.value);
    };
    return (
        
            <div className='login-bg'>
                <div className='login-wrap'>

                <span className='page-title'>로그인</span>
                <section>
                    <form className='user-role-wrap'>
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
                    </form>
                </section>
                <section className='user-loginp-wrap'>
                    <div className='id-inp user-loginp'>
                        <label>아이디</label>
                        <input type="text" placeholder='아이디를 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>비밀번호</label>
                        <input type="password" placeholder='비밀번호를 입력해주세요' required/>
                    </div>
                </section>
                <div className='find-wrap'>
                    <Link to="/login/findId">아이디 찾기</Link>
                    <span> | </span>
                    <Link to="/login/findPw">비밀번호 찾기</Link>
                </div>
                <div className='btn-wrap'>
                    <button type='submit' className='btn-50' >로그인</button>
                    <Link to="/login/signUp" className='link-btn-50'>회원가입</Link>
                </div>

                </div>
            </div>
        
    );
}

export default Login;