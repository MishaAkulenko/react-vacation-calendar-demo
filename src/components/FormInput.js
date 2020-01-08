import React from "react";

function FormInput({type, setValue, hasError, errorText}) {
    return (
        <div className={`input-wrapper${hasError ? ' error' : ''}`}>
            <input type={type}
                   onChange={ setValue }
            />
            <span>Поле не должно быть пустым</span>
        </div>
    )
}

export default FormInput
