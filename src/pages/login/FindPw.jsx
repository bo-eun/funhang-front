import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import InputForm from "../../components/InputForm";
import BtnLinkForm from "../../components/BtnLinkForm";
import BtnForm from "../../components/BtnForm";
import ShowModal from "../../components/ShowModal";
import styles from '../../assets/css/login.module.css';

const findPwFields = [
  { label: "이름", name: "username", type: "text", placeholder: "이름을 입력하세요" },
  { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력하세요" },
];
const chgPwFields = [
  { label: "새 비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요" },
  { label: "새 비밀번호 확인", name: "passwordCk", type: "password", placeholder: "비밀번호를 입력하세요" },
];

function FindPw(props) {
    const [checkPw, setCheckPw] = useState(false);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findSchema = yup.object().shape({
        username: yup.string().required("이름을 입력하십시오"),
        userId: yup.string().required("아이디를 입력하십시오"),
    });

    const changePwSchema = yup.object().shape({
        password: yup
        .string()
        .required("비밀번호를 입력하십시오")
        .min(6, "비밀번호는 최소 6자리 이상이어야 합니다"),
        passwordCk: yup
        .string()
        .required("비밀번호를 확인하십시오")
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(checkPw ? changePwSchema : findSchema),
    });

    const onSubmit = (data) => {
        console.log("폼 데이터:", data);
        setCheckPw(true);
        reset();
    };
    return (
        <>
            {!checkPw && (
                <form className={styles.user_loginp_wrap} onSubmit={handleSubmit(onSubmit)}>
                {findPwFields.map((field) => (
                    <InputForm
                    key={field.name}
                    {...field}
                    register={register}
                    error={errors[field.name]}
                    />
                ))}

                <div className={styles.btn_wrap}>
                <BtnForm
                    type="submit"
                    className='btn_50_b'
                    btnName="비밀번호찾기"
                    />
                </div>
            </form>
            )}
            {checkPw && (
                <div className={styles.user_loginp_wrap}>
                {chgPwFields.map((field) => (
                    <InputForm
                    key={field.name}
                    {...field}
                    register={register}
                    error={errors[field.name]}
                    />
                ))}
                <div className={styles.btn_wrap}>
                <BtnForm
                    type="button"
                    onClick={handleShow}
                    className='btn_50_b'
                    btnName="비밀번호 변경"
                    />
                </div>
            </div>
            )}
        
                {/* 모달 */}
                <ShowModal
                    show={show}
                    handleClose={handleClose}
                    />
            </>
    );
}

export default FindPw;
