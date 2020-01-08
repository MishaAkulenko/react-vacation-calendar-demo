import React from "react";
import {connect} from 'react-redux';
import store from "../store";
import {Link} from 'react-router-dom';

const ProfileSettingsIcon = ({user})=>{

    function logout() {
        store.dispatch({
            type: 'SET_USER_INFO',
            user: null
        });
        localStorage.removeItem('currentUser');
    }

    return(
        <div className={'profile-settings-wrapper'}>
            <div className={'profile-settings-icon'}>
                <span>{user.login.slice(0,2)}</span>
            </div>
            <div className={'settings-actions-list'}>
                <Link to={'/profile'} className={'settings settings-actions-item'}>Settings</Link>
                <div className={'logout settings-actions-item'} onClick={logout}>Logout</div>
            </div>
        </div>
    )
};
const mapStateToProps = (state)=>{
    return {
        user: state.userState
    }
};
export default connect(mapStateToProps)(ProfileSettingsIcon);
