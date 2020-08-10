//survey field contains logic to render a single lable and text field

import React from 'react';

export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} /> {/* equals to onBlur={input.onBlur} onchange={input.onchange} etc */}
            <div className="red-text" style={{marginBottom: '20px'}}>
            {touched && error}
            </div>
            
        </div>
    )
};