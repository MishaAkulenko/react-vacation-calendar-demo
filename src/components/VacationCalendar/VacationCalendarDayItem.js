import React from "react";
import {connect} from "react-redux";
import store from "../../store/store";
import ActiveUsersList from "./ActiveUsersList";
import {MONTHS_NAMES, MANDATORY_PERIOD}  from '../../config/const.js';

function VacationDayItem({user, vacationDays, availDays, date, className, users, vacationPeriodToConfirmation, confirmationStatus}) {
    const isInVacationList = checkIsThisDayInVacationList();
    const usersVacationsOnThisDay = getUsersVacationsOnThisDay();
    const isSelectAvailable = checkIsCurrentDayAvailToVacationSelect();

    const classList = {
        wrapper: ['grid-cell day-item', isInVacationList ? 'active' : '', !isSelectAvailable ? 'unavailable' : '', className || '', getConfirmationStatusStyle()],
        dateIndicator: [`date flex-between`,date.getDay() === 0 || date.getDay() === 6 ? ' holiday' : '']
    };

    function checkIsThisDayInVacationList (){
        return vacationDays.find((day)=>{
            return day.getTime() === date.getTime();
        })
    }
    function addDayToVacationList() {
        let period = [date];

        if (user.first_vacation_interval) {
            function* generateDatePeriod() {
                for (let i=0; i < MANDATORY_PERIOD; i++ ) yield new Date(date.getFullYear(), date.getMonth(),date.getDate() + i)
            }
            period = [...generateDatePeriod()];
        }

        store.dispatch({
            type: 'SET_VACATION_PERIOD',
            vacationDays: period
        });
    }
    function removeDayFromVacationList() {
        if (user.first_vacation_interval) {
            store.dispatch({
                type: 'CLEAR_VACATION_LIST',
                removedDay: date
            });
            return
        }
        store.dispatch({
            type: 'REMOVE_VACATION_DAY',
            removedDay: date
        });
    }

    function getUsersVacationsOnThisDay() {
        return users.filter((user)=>{
            return user.reserved.find((item)=>{
                return item.toString() === date.toString()
            })
        })
    }
    function checkIsCurrentDayAvailToVacationSelect (){
        const currentDate = new Date();

        if (!user.first_vacation_interval && user.vacation_days < MANDATORY_PERIOD) return false; //Если на первый отпуск в году не накопилось 14 дней, то его взять нельзя
        return date.getTime() >= new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate() + MANDATORY_PERIOD).getTime()
    }
    function getConfirmationStatusStyle(){
        return `${checkConfirmationStatus()} ${getCurrentDayStyle()}`;
    }
    function getCurrentDayStyle() {
        return date.getDate()=== new Date().getDate() ? 'current-day' : '';
    }
    function checkConfirmationStatus() {
        let isThisDayOnConfirmationPeriod = vacationPeriodToConfirmation.find((day)=>{
            return date.getTime() === day.getTime()
        });
        return isThisDayOnConfirmationPeriod && confirmationStatus
    }

    return (
        <div className={classList.wrapper.join(' ')}>
            <div className={'do-select-wrapper'}>
                { isSelectAvailable && (
                    isInVacationList
                        ? <i className="material-icons remove" onClick={removeDayFromVacationList} title='Отменить резервацию'>clear</i>
                        : availDays.avail !== 0
                            ? <i className="material-icons add" onClick={addDayToVacationList} title='Зарезервировать' >add</i>
                            : null
                  )
                }
                <div className='user-name'>
                    { isInVacationList ? user.login : null}
                </div>
            </div>
            <ActiveUsersList usersVacationsOnThisDay={usersVacationsOnThisDay}/>
            <div className={classList.dateIndicator.join(' ')}>
                <div className='flex-center'>
                    <i className="material-icons today-indicator" title='сегодня'> </i>
                    <span className={`month-name`}>{MONTHS_NAMES[date.getMonth()]}</span>
                </div>
                <span>{date.getDate()}</span>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState,
        users: state.usersState,
        vacationDays: state.vacationState.reservedDays,
        availDays: state.vacationState.availDaysToVacation,
        vacationPeriodToConfirmation: state.vacationState.vacationPeriodToConfirmation,
        confirmationStatus: state.vacationState.confirmationStatus,
    }
};
export default connect(mapStateToProps)(VacationDayItem);
