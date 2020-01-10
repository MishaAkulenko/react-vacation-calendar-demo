import authApi from "../api/authApi";
import usersApi from "../api/usersApi";

export const doLogin = loginInfo => async dispatch => {
    const response = await authApi.LOGIN(loginInfo);

    localStorage.setItem('currentUser', JSON.stringify(response));
    dispatch({
        type: 'SET_USER_INFO',
        user: response
    });
    dispatch({
        type: 'SET_MAX_ACTIVE_VOCATION_DAYS',
        availDays: response.vacation_days,
    });
    return response;
};

export const doLogout = () => async dispatch =>{
    await authApi.LOGOUT();
    localStorage.removeItem('currentUser');
    dispatch({
        type: 'SET_USER_INFO',
        user: null
    });
    dispatch({ type: 'RESET_VACATION_STATE' });
};
export const fetchUsersVacationList = () => async dispatch => {
    const response = await  usersApi.GET_USERS_LIST();
    dispatch({
        type: 'SET_USERS_LIST',
        users: response,
    });
    return response;
};
export const sendSelectedVacationPeriod = (period) => async dispatch => {
    const response = await usersApi.SEND_SELECTED_VACATION(period);
    dispatch({
        type: 'SET_VACATION_PERIOD_TO_CONFIRMATION',
        period
    });
    dispatch({
        type: 'CHANGE_VACATION_STATUS',
        status: response.status,
    });
    return response;
};
