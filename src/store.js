import { createStore, combineReducers } from 'redux';

const userReducer = function(state = null, action) {
    if (action.type === 'SET_USER_INFO') {
        return state = action.user
    }
    return state;
};
const activeVacationReducer = function (state = {max:0, avail:0}, action) {
    let avail = state.avail;
    switch (action.type) {
        case 'SET_MAX_ACTIVE_VOCATION_DAYS':
            return state = {max: action.availDays, avail: action.availDays};
        case 'INC_ACTIVE_VOCATION_DAYS':
            return state.avail + 1 <= state.max ? {...state, avail: ++avail} : state;
        case 'DEC_ACTIVE_VOCATION_DAYS':
            return state.avail - 1 >= 0 ? {...state, avail: --avail} : state;
        case 'RESET_ACTIVE_VOCATION_DAYS':
            return {...state, avail: state.max};
        default:
            return state
    }
};
const vacationReducer = function(state = [], action) {
    switch (action.type) {
        case 'ADD_VACATION_DAY':
            return state.concat(action.vacationDays);
        case 'REMOVE_VACATION_DAY':
            let index = state.findIndex((date)=>{
                return date.toString() === action.vacationDays.toString()
            });
            let clonedArr = state.slice();
            clonedArr.splice(index,1);
            return clonedArr;
        case 'CLEAR_VACATION_LIST':
            return state = [];
        default:
                return state
    }
};
const usersReducer = function (state = [], action) {
    if (action.type === 'SET_USERS_LIST') {
        return state = action.users
    }
    return state;
};
const reducers = combineReducers({
    userState: userReducer,
    vacationState: vacationReducer,
    activeVacationState: activeVacationReducer,
    usersState: usersReducer,
});

export default createStore(reducers)
