import React from 'react';
import { Link } from 'react-router';
import '../../assets/css/Login.css';

function Login(props) {
    return (
        <>
            <div className='login-bg'>
                
                <span className='login-title'>로그인</span>
                <section className='user-role-wrap'>
                    <div>
                        <input type="radio" />
                        <span>사용자</span>
                    </div>
                    <div>
                        <input type="radio" />
                        <span>관리자</span>
                    </div>
                </section>
                <section className='user-loginp-wrap'>
                    <div className='id-inp user-loginp'>
                        <span>아이디</span>
                        <input type="text" />
                    </div>
                    <div className='pw-inp user-loginp'>
                        <span>비밀번호</span>
                        <input type="password" />
                    </div>
                </section>
                <div>
                    <Link to="/">아이디 찾기</Link>
                    <span> | </span>
                    <Link to="/">비밀번호 찾기</Link>
                </div>
                <div>
                    <button>로그인</button>
                    <Link to="/">회원가입</Link>
                </div>

            </div>
        </>
    );
}

export default Login;