import React, { useEffect, useState } from 'react';
import styles from '@/pages/login/login.module.css';

function InputForm({
  label,
  id='',
  type = "text",
  placeholder,
  register,
  name,
  error,
  readOnly = false,
  defaultValue,
  setValue,
  className = "",
}) {
  // 내부 상태는 useForm이 없을 때만 사용
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  useEffect(() => {
    if (!register) {
      setInternalValue(defaultValue || "");
    }
  }, [defaultValue, register]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInternalValue(value);
    if (setValue) setValue(e);
  };

  // useForm 사용 여부 확인
  const isUseForm = !!(register && name);

  return (
    <div className={`${styles.user_loginp} ${className}`}>
      <label>{label}</label>
      <input
        id={id}
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        {...(isUseForm ? register(name) : {})} // useForm 연결
        className="form-control"
        value={isUseForm ? undefined : internalValue} // useForm은 value 직접 설정하지 않음
        onChange={isUseForm ? undefined : handleChange} // useForm은 자체 onChange 사용
        onWheel={(e) => e.target.blur()} //numberInput으로 설정 시 휠로 값이 설정되는거 막음
      />
      {error && <p className="error-msg">{error.message}</p>}
    </div>
  );
}

export default InputForm;
