import React from 'react';
import styles from '../assets/css/login.module.css';

function InputForm({ label, type = "text", placeholder, register, name, error, readOnly=false, defaultValue,setValue, className="" }) {
    return (
        <div className={`${styles.user_loginp} ${className}`}>
            <label>{label}</label>
            <input
                type={type}
                readOnly={readOnly}
                placeholder={placeholder}
                {...(register && name ? register(name) : {})}
                className="form-control"
                defaultValue={defaultValue}
                onChange={setValue}
            />
            {error && <p className="error-msg">{error.message}</p>}
        </div>
    );
}

export default InputForm;