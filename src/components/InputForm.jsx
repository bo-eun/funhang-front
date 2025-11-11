import React, { useEffect, useState } from 'react';
import styles from '@/pages/login/login.module.css';

function InputForm({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
  readOnly = false,
  defaultValue,
  setValue,
  className = ""
}) {
  // 내부 상태는 RHF가 없을 때만 사용
  const [internalValue, setInternalValue] = useState(defaultValue || "");

    console.log(defaultValue)
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

  // RHF 사용 여부 확인
  const isRHF = !!(register && name);
  return (
    <div className={`${styles.user_loginp} ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        {...(isRHF ? register(name) : {})} // RHF 연결
        className="form-control"
        value={isRHF ? undefined : internalValue} // RHF는 value 직접 설정하지 않음
        onChange={isRHF ? undefined : handleChange} // RHF는 자체 onChange 사용
      />
      {error && <p className="error-msg">{error.message}</p>}
    </div>
  );
}

export default InputForm;
