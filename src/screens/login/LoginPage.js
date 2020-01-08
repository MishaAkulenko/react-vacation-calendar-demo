import React from "react";
import './LoginPage.scss';
import logo from '../../assets/img/logo.png';
import {useState} from 'react';
import {withRouter} from 'react-router-dom';
import FormInput from "../../components/FormInput";
import store from "../../store";
import authApi from "../../api/authApi";
import LoaderButton from "../../components/LoaderButton";

function LoginPage({history, user}) {
    const [loginInfo, setLoginInfo] = useState({
        login: '',
        password: '',
    });
    const [errors, setError] = useState({
        login: false,
        password: false,
    });
    const [loading, setLoading] = useState(false);
    function doLogin(e) {
        e.preventDefault();

        validateForm(()=>{
            setLoading(true);
            authApi.LOGIN(loginInfo)
                .then((response)=>{
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    store.dispatch({
                        type: 'SET_USER_INFO',
                        user: response
                    });
                    store.dispatch({
                        type: 'SET_MAX_ACTIVE_VOCATION_DAYS',
                        availDays: response.vacation_days,
                    });
                    setLoading(false);
                    history.push('/')
                });
        });
    }
    function validateForm(cb) {
        let errorsObj = {};
        if (!loginInfo.login.trim()){
            Object.assign(errorsObj, {login: true})
        }
        if (!loginInfo.password.trim()){
            Object.assign(errorsObj, {password: true});
        }
        if(loginInfo.login.trim() && loginInfo.password.trim()){
            Object.assign(errorsObj, {
                login: false,
                password: false,
            });
            cb();
        }
        setError(errorsObj);
    }
    function updateLoginInfo(prop, val) {
        setLoginInfo(
            Object.assign(loginInfo, {[prop]: val})
        )
    }

    return (
        <main className={'login-page'}>
            <div className='wrapper'>
                <header>
                    <h1>Yellow Duck</h1>
                    <img src={logo} alt="кря" className='logo'/>
                </header>
                <section>
                    <form onSubmit={doLogin}>
                        <p>Введите любой логин</p>
                        <FormInput type='text'
                                   setValue={(e) => {
                                       updateLoginInfo('login', e.target.value)
                                   }}
                                   hasError={errors.login}
                        />
                        <p>Введите любой пароль</p>
                        <FormInput type='password'
                                   setValue={(e) => {
                                       updateLoginInfo('password', e.target.value)
                                   }}
                                   hasError={errors.password}
                        />
                        <div className='button-wrapper'>
                            <LoaderButton type={'submit'} loading={loading}>Login</LoaderButton>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default withRouter(LoginPage);
