import React from "react";

export default ({children, type, loading})=>{
    return (
        <button type={type}>
            {
                !loading ? children :
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            }


        </button>
    )
}
