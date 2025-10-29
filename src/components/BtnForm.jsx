import React from 'react';

function LongBtn({btnName,type,className}) {
    return (
        <div className="btn-wrap">
            <button type={type} className={className}>
                {btnName}
            </button>
        </div>
    );
}

export default LongBtn;