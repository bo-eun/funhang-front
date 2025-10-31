import React from 'react';
import styles from '../assets/css/login.module.css';

function InputForm({ label, type = "text", placeholder, register, name, error }) {
    return (
        <div className={styles.user_loginp}>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="form-control"
            />
            {error && <p className="error-msg">{error.message}</p>}
        </div>
    );
}

export default InputForm;