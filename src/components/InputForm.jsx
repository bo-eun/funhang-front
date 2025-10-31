import React from 'react';

function InputForm({ label, type = "text", placeholder, register, name, error, readOnly=false }) {
    return (
        <div className='id-inp user-loginp'>
            <label>{label}</label>
            <input
                type={type}
                readOnly={readOnly}
                placeholder={placeholder}
                {...register(name)}
                className="form-control"
            />
            {error && <p className="error-msg">{error.message}</p>}
        </div>
    );
}

export default InputForm;