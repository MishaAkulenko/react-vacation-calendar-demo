import {combineReducers} from "redux";

const userReducer = function(state = null, action) {
    if (action.type === 'SET_USER_INFO') {
        return state = action.user
    }
    return state;
};

const vacationReducerInitialState = {
    reservedDays: [],
    availDaysToVacation: {max:0, avail:0},
    confirmationStatus: '',
    vacationPeriodToConfirmation: [],
};
const vacationReducer = function(state = vacationReducerInitialState, action) {
    let maxAvail = state.availDaysToVacation.max,
        avail = state.availDaysToVacation.avail;

    switch (action.type) {
        case 'SET_VACATION_PERIOD':
            return state = Object.assign({}, state,{
                reservedDays: state.reservedDays.concat(action.vacationDays),
                availDaysToVacation: {...state.availDaysToVacation, avail: avail - action.vacationDays.length},
            });
        case 'REMOVE_VACATION_DAY':
            let removedPosition = state.reservedDays.findIndex((date)=>{
                return date.toString() === action.removedDay.toString()
            });
            let clonedArr = state.reservedDays.slice();
            clonedArr.splice(removedPosition,1);
            return {...state, reservedDays : clonedArr, availDaysToVacation: {max:maxAvail, avail: ++avail}};
        case 'SET_MAX_ACTIVE_VOCATION_DAYS':
            return state = {...state, availDaysToVacation : {max: action.availDays, avail: action.availDays}};
        case 'SET_VACATION_PERIOD_TO_CONFIRMATION':
            return state = {...state, vacationPeriodToConfirmation : action.period};
        case 'CHANGE_VACATION_STATUS':
            return state = {...state, confirmationStatus : action.status};
        case 'CLEAR_VACATION_LIST':
            const toConfirmList = state.vacationPeriodToConfirmation;
            return state = {
                ...state,
                reservedDays: [].concat(toConfirmList),
                availDaysToVacation: {max: maxAvail, avail: maxAvail - toConfirmList.length}
            };
        case 'RESET_VACATION_STATE':
            return state = {...vacationReducerInitialState};
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

export const reducers = combineReducers({
    userState: userReducer,
    vacationState: vacationReducer,
    usersState: usersReducer,
});
