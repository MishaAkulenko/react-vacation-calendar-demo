import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions.js';

const ProfileSettingsIcon = ({user, doLogout})=>{
    return(
        <div className={'profile-settings-wrapper'}>
            <div className={'profile-settings-icon'}>
                <span>{user.login.slice(0,2)}</span>
            </div>
            <div className={'settings-actions-list'}>
                <Link to={'/profile'} className={'settings settings-actions-item'}>Settings</Link>
                <div className={'logout settings-actions-item'} onClick={doLogout}>Logout</div>
            </div>
        </div>
    )
};
const mapStateToProps = (state)=>{
    return {
        user: state.userState
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        doLogout: bindActionCreators(actions.doLogout, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsIcon);
