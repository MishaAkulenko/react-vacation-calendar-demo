import React from "react";
import {connect} from "react-redux";
import {useState} from 'react';
import './VacationCalendar.scss';
import VacationCalendarDateList from "./VacationCalendarDateList";
import DateListSelector from "./DateListSelector";
import store from "../../store/store";
import {MONTHS_NAMES}  from '../../config/const.js';
import {getDateLocale} from "../../utils/utils";
import {bindActionCreators} from "redux";
import * as actions from "../../actions/actions";

function VacationCalendar ({availDays, reservedDays, sendSelectedVacationPeriod,vacationPeriodToConfirmation}) {
    const reserved = availDays.max - availDays.avail;
    const initialDate = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    };
    const [dateInterval, setDateInterval] = useState(initialDate);

    function getMonthName(num) {
        return MONTHS_NAMES[num]
    }

    function incrementDate() {
        setDateInterval({
            month: dateInterval.month > 10 ? 0 : dateInterval.month + 1,
            year: dateInterval.month > 10 ? dateInterval.year + 1 : dateInterval.year,
        })
    }
    function decrementDate() {
        if (isPastMonth()) return;
        setDateInterval({
            month: dateInterval.month < 1 ? 11 : dateInterval.month - 1,
            year: dateInterval.month < 1 ? dateInterval.year - 1 : dateInterval.year,
        })
    }
    function isPastMonth() {
        return dateInterval.month <= new Date().getMonth() || dateInterval.year < new Date().getFullYear()
    }
    function* generateYearsList() {
        let currentYear = new Date().getFullYear();
        for (let i=currentYear; i<=currentYear + 5; i++) yield i
    }
    function sendSelectedPeriodToConfirm() {
        sendSelectedVacationPeriod(reservedDays);
    }
    function clearSelectedList() {
        store.dispatch({
            type: 'CLEAR_VACATION_LIST'
        });
    }

    function hasActiveSelectedDay() {
        //Говнокод! Писал это поздно, поэтому уже плавило...
        function compareDateIntervals() {
            if(!Boolean(reserved)) return false;

            let isCompare = true;
            vacationPeriodToConfirmation.forEach((day)=>{
                let datesCompare = reservedDays.find((item)=>{
                    return item.getTime() === day.getTime()
                });
                if (!datesCompare) {isCompare = false}
            });

            return isCompare;
        }

        return (Boolean(reserved) && vacationPeriodToConfirmation.length !== reserved) || !compareDateIntervals();
    }
    return (
        <div className={'calendar-wrapper'}>
            <div className={'calendar-header'}>
                <div className={'flex-center'}>
                    <i className={`material-icons${isPastMonth() ? ' unactive' : ''}`} onClick={decrementDate}>keyboard_arrow_left</i>
                    <i className="material-icons" onClick={incrementDate}>keyboard_arrow_right</i>
                    <div className={'vacation-info subtitle'}>
                        <span>Зарезервировано {reserved} {getDateLocale(availDays.avail, 'days')}</span>
                        {
                            hasActiveSelectedDay() &&
                            <i className="material-icons done-all"
                               title={'Запросить'}
                               onClick={sendSelectedPeriodToConfirm}>
                                done_all
                            </i>
                        }
                        {hasActiveSelectedDay() && <i className="material-icons clear-all" title={'Очистить все'} onClick={clearSelectedList}>clear_all</i>}
                    </div>
                </div>
                <div className={'flex-center current-date'}>
                    <DateListSelector dateList={MONTHS_NAMES}
                                      changeDateInterval={(date, key)=>{setDateInterval({...dateInterval, month: key})}}
                    >
                        {getMonthName(dateInterval.month)}
                    </DateListSelector>
                    <DateListSelector dateList={[...generateYearsList()]}
                                      changeDateInterval={(date)=>{setDateInterval({...dateInterval, year: date})}}
                    >
                        {dateInterval.year}
                    </DateListSelector>
                    <i className="calendar-icon material-icons"
                       title='К текущей дате'
                       onClick={()=>{setDateInterval(initialDate)}}
                    >today</i>
                </div>
            </div>
            <VacationCalendarDateList dateInterval={dateInterval}/>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        availDays: state.vacationState.availDaysToVacation,
        reservedDays: state.vacationState.reservedDays,
        vacationPeriodToConfirmation: state.vacationState.vacationPeriodToConfirmation,
    }
};
const  mapDispatchToProps = (dispatch) =>{
    return {
        sendSelectedVacationPeriod: bindActionCreators(actions.sendSelectedVacationPeriod, dispatch)
    }
};
export default  connect(mapStateToProps, mapDispatchToProps)(VacationCalendar)
