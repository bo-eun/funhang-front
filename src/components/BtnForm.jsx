import React from 'react';

function LongBtn({btnName,type = "button",className, disabled = false, onClick }) {
    return (
        
            <button 
                type={type} 
                className={className}
                disabled={disabled}
                onClick={onClick}
            >
                {btnName}
            </button>
        
    );
}

export default LongBtn;