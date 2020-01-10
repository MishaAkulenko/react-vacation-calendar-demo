import React from "react";
import {connect} from "react-redux";

const ActiveUsersList = function ({usersVacationsOnThisDay, loggedUser}) {
    return (
        <div>
            <div  className={'active-users'}>
                <div  className={'user-wrapper'}>
                    <div className={'avatar'}>
                        <i className="material-icons wait-confirm-indicator" title='Ожидается подтверждение'>access_time</i>
                    </div>
                    <div className={'user-login'}>{loggedUser.login}</div>
                </div>
                {usersVacationsOnThisDay.map((user, key)=>{
                    return (
                        <div  className={'user-wrapper'} key={key}>
                            <div className={'avatar'}>
                                <i className="material-icons" style={{'color': user.color}}>account_circle</i>
                            </div>
                            <div className={'user-login'}>{user.login}</div>
                        </div>)
                })}
            </div>
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        loggedUser: state.userState
    }
};
export default connect(mapStateToProps)(ActiveUsersList);
