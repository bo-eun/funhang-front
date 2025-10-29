import React from 'react';
import { Link } from 'react-router';

function SignUp(props) {
    return (
        <div className='login-bg login-bg-long'>
                <div className='login-wrap'>

                <span className='page-title'>회원가입</span>
                <section className='user-loginp-wrap'>
                    <div className='id-inp user-loginp'>
                        <label>아이디</label>
                        <input type="text" placeholder='아이디를 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>비밀번호</label>
                        <input type="password" placeholder='비밀번호를 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>비밀번호 확인</label>
                        <input type="password" placeholder='비밀번호를 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>이름</label>
                        <input type="text" placeholder='이름을 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>이메일</label>
                        <input type="text" placeholder='이메일을 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>휴대폰 번호</label>
                        <input type="text" placeholder='휴대폰 번호를 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>닉네임</label>
                        <input type="text" placeholder='닉네임을 입력해주세요' required/>
                    </div>
                    <div className='pw-inp user-loginp'>
                        <label>생년월일</label>
                        <input type="date" placeholder='생년월일을 선택해주세요' required/>
                    </div>
                </section>
                <div className='btn-wrap'>
                    <button type='submit' className='btn-50' >회원가입</button>
                </div>
                    
                </div>
            </div>
    );
}

export default SignUp;