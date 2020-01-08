import React from "react";

function DateListSelector({children, dateList, changeDateInterval}) {
    return (
        <div className={'date-selector-wrapper'}>
            <span>{children}</span>
            <div className={'list'}>
                {
                    dateList.map((date, key)=>{
                        return <div key={key} onClick={()=>{
                            changeDateInterval(date, key)
                        }}>{date}</div>
                    })
                }
            </div>
        </div>

    )
}

export default DateListSelector;
