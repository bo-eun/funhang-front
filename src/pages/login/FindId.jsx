import React, { useState } from "react";
import { Link } from "react-router";
import '../../assets/css/Login.css';

function FindId(props) {
    const [checkId, setCheckId] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    
    const handleSubmit = (e) => {
        setCheckId(true);
    };
    return (
        <div className="login-bg">
        <div className="login-wrap">
            <span className="page-title">아이디 찾기</span>
            {/* 아이디 찾기 index */}
            {!checkId && (
                <form className="user-loginp-wrap" onSubmit={handleSubmit}>
                    <div className="id-inp user-loginp">
                        <label>이름</label>
                        <input type="text" placeholder="이름을 입력해주세요" required />
                    </div>

                    <div className="id-inp user-loginp">
                        <label>이메일</label>
                        <input type="text" placeholder="이메일을 입력해주세요" required />
                    </div>

                    <div className="btn-wrap">
                        <button type="submit" className="btn-50">
                            아이디찾기
                        </button>
                    </div>
                </form>
            )}
            {checkId &&(
                <div className="user-loginp-wrap">
                    <p className="result-id-txt">
                        회원님의 아이디는 user_99 입니다.
                    </p>
                    <div className='btn-wrap'>
                        <Link to="/login" className='btn-50' >로그인</Link>
                        <Link to="/login/findPw" className='link-btn-50'>비밀번호 찾기</Link>
                    </div>
                </div>
            )}
        </div>
        {/* 모달 */}
        {isModalOpen && (
            <div className="modal" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-list">
                    <p>
                        조회된 정보가 없습니다.
                        <br />
                        다시 입력해 주세요.
                    </p>
                    <button onClick={closeModal} className="modal-log-btn">
                        닫기
                    </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default FindId;
