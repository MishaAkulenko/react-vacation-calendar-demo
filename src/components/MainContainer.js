import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import ProfilePage from "../screens/profile/ProfilePage";
import HomePage from "../screens/home/HomePage";
import LoginPage from "../screens/login/LoginPage";

const MainContainer = ({user})=> (
    <div className="app">
        <Router>
            <Switch>
                <Route exact path={'/'} render={() => (user ? <HomePage/> : <Redirect to="/login"/>)}/>
                <Route path={'/login'} render={() => (!user ? <LoginPage/> : <Redirect to="/"/>)}/>
                <Route path={'/profile'} component={ProfilePage}/>
            </Switch>
        </Router>
    </div>
);
const mapStateToProps = (state) => {
    return {
        user: state.userState
    }
};
export default connect(mapStateToProps)(MainContainer)
