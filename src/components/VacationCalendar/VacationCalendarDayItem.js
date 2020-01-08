import React from "react";
import {connect} from "react-redux";
import store from "../../store";
import ActiveUsersList from "./ActiveUsersList";

function VacationDayItem({user, vacationDays, availDays, date, className, users}) {
    const isInVacationList = isThisDayInVacationList ();

    function isThisDayInVacationList (){
        return vacationDays.find((day)=>{
            return day.toDateString() === date.toDateString();
        })
    }
    function addDayToVacationList() {
        store.dispatch({
            type: 'ADD_VACATION_DAY',
            vacationDays: date
        });
        store.dispatch({
            type: 'DEC_ACTIVE_VOCATION_DAYS'
        })
    }
    function removeDayFromVacationList() {
        store.dispatch({
            type: 'REMOVE_VACATION_DAY',
            vacationDays: date
        });
        store.dispatch({
            type: 'INC_ACTIVE_VOCATION_DAYS'
        })
    }

    function getUsersVacationsOnThisDay() {
        return users.filter((user)=>{
            return user.reserved.find((item)=>{
                return item.toString() === date.toString()
            })
        })
    }
    const usersVacationsOnThisDay = getUsersVacationsOnThisDay();

    return (
        <div className={`grid-cell  day-item ${className}${isInVacationList ? ' active' : ''}`}>
            <div className={'do-select-wrapper'}>
                {
                    isInVacationList
                        ? <i className="material-icons remove" onClick={removeDayFromVacationList} title='Отменить резервацию'>clear</i>
                        : availDays.avail !== 0
                            ? <i className="material-icons add" onClick={addDayToVacationList} title='Зарезервировать' >add</i>
                            : null
                }
                <div className='user-name'>{ isInVacationList ? user.login : null}</div>
            </div>
            <ActiveUsersList usersVacationsOnThisDay={usersVacationsOnThisDay}/>
            <div className={`date`}>
                <span>{date.getDate()}</span>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState,
        users: state.usersState,
        vacationDays: state.vacationState,
        availDays: state.activeVacationState,

    }
};
export default connect(mapStateToProps)(VacationDayItem);
