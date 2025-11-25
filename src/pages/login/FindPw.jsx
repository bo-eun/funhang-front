import React, { useState } from 'react';
import { Link } from 'react-router';

function FindPw(props) {
    const [checkPw, setCheckPw] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleSubmit = (e) => {
        setCheckPw(true);
    };
    const updatePw=(e)=>{
        setIsModalOpen(true);
    }
    return (
        <div className="login-bg">
        <div className="login-wrap">
            <span className="login-title">{checkPw===false?"비밀번호 찾기":"비밀번호 변경"}</span>
            {/* 비밀번호 찾기 index */}
            {!checkPw && (
                <form className="user-loginp-wrap" onSubmit={handleSubmit}>
                    <div className="id-inp user-loginp">
                        <label>이름</label>
                        <input type="text" placeholder="이름을 입력해주세요" required />
                    </div>

                    <div className="id-inp user-loginp">
                        <label>아이디</label>
                        <input type="text" placeholder="아이디를 입력해주세요" required />
                    </div>

                    <div className="btn-wrap">
                        <button type="submit" className="btn-50">
                            비밀번호찾기
                        </button>
                    </div>
                </form>
            )}
            {checkPw &&(
                <div className="user-loginp-wrap">
                    <div className="id-inp user-loginp">
                        <label>새 비밀번호</label>
                        <input type="password" placeholder="새 비밀번호를 입력해주세요" required />
                    </div>
                    <div className="id-inp user-loginp">
                        <label>새 비밀번호 확인</label>
                        <input type="password" placeholder="새 비밀번호를 입력해주세요" required />
                    </div>
                    <div className='btn-wrap'>
                        <button type='button' className='btn-50' onClick={updatePw} >비밀번호 변경</button>
                    </div>
                </div>
            )}
        </div>
        {/* 모달 */}
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-list">
                    <p>
                        비밀번호가 변경되었습니다.
                    </p>
                    <Link to="/login" className="modal-log-btn">
                        닫기
                    </Link>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default FindPw;