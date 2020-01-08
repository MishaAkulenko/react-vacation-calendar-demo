import React from "react";
import {useState}from 'react';

const ActiveUsersList = function ({usersVacationsOnThisDay}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div  className={'active-users'}>
                {usersVacationsOnThisDay.map((user, key)=>{
                    return (
                        <div  className={'user-wrapper'} key={key} style={usersVacationsOnThisDay.length > 1 && key && !open > 0 ? {'display':'none'} : null}>
                            <div className={'avatar'}>
                                <i className="material-icons" style={{'color': user.color}}>account_circle</i>
                            </div>
                            <div className={'user-name'}>{user.login}</div>
                        </div>)
                })}
                {
                    usersVacationsOnThisDay.length > 1 &&
                        <i className="show-more-users material-icons" onClick={()=>{setOpen(!open)}}>
                            {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </i>
                }
            </div>
        </div>
    )
};
export default ActiveUsersList;
