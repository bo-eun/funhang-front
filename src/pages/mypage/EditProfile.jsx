import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import InputForm from "../../components/InputForm";
import BtnForm from "../../components/BtnForm";
import styles from "../../assets/css/mypage.module.css"

function EditProfile(props) {
    const schema = yup.object().shape({
        passwordCk: yup.string().when("password", {
            is: (password) => password && password.length > 0, // password가 입력된 경우만
            then: (schema) =>
            schema
                .required("비밀번호 확인을 입력하십시오")
                .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
            otherwise: (schema) => schema.notRequired(), // password 없으면 검증 안 함
        }),
        userName: yup.string().required("이름을 입력하십시오"),
        email: yup.string().required("이메일을 입력하십시오"),
        phone: yup.string().required("휴대폰 번호를 입력하십시오")
            .matches(/^[0-9]+$/, "숫자만 입력 가능합니다")
            .min(10, "10자리 이상 입력해주세요")
            .max(11, "11자리 이하로 입력해주세요"),
        nickname: yup.string().required("닉네임을 입력하십시오"),
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
        <div className={styles.point_cont}>
            <h3>내 정보 수정</h3>

            <div className={styles.form_cont}>
                <form action=""  onSubmit={handleSubmit(onSubmit)}>
                    <section className={styles['user-loginp-wrap']}>
                        <InputForm
                            label="아이디"
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            readOnly={true}
                            name="userId"
                            register={register}
                        />
                        <InputForm
                            label="비밀번호"
                            type="password"
                            placeholder="새 비밀번호를 입력해주세요"
                            name="password"
                            register={register}
                        />
                        <InputForm
                            label="비밀번호 확인"
                            type="password"
                            placeholder="새 비밀번호를 입력해주세요"
                            name="passwordCk"
                            register={register}
                            error={errors.passwordCk}
                        />
                        <InputForm
                            label="이름"
                            type="text"
                            placeholder="이름을 입력해주세요"
                            name="userName"
                            register={register}
                            error={errors.userName}
                        />
                        <InputForm
                            label="이메일"
                            type="text"
                            placeholder="이메일을 입력해주세요"
                            name="email"
                            register={register}
                            error={errors.email}
                        />
                        <InputForm
                            label="휴대폰 번호"
                            type="text"
                            placeholder="휴대폰 번호를 입력해주세요"
                            name="phone"
                            register={register}
                            error={errors.phone}
                        />
                        <InputForm
                            label="닉네임"
                            type="text"
                            placeholder="닉네임을 입력해주세요"
                            name="nickname"
                            register={register}
                            error={errors.nickname}
                        />
                        <InputForm
                            label="생년월일"
                            type="date"
                            placeholder="생년월일을 입력해주세요"
                            name="birth"
                            register={register}
                            readOnly={true}
                        />
                    </section>
                    <div className={styles["btn_wrap"]}>
                        <BtnForm
                            type='submit'
                            // onClick={goLogin}
                            className='btn_50_b w-100 mt-3'
                            btnName='수정'
                        />
                    </div>
                </form>
            </div>

        </div>
    );
}

export default EditProfile;