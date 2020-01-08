import React from "react";
import {connect} from "react-redux";
import {useState} from 'react';
import './VacationCalendar.scss';
import VacationCalendarDateList from "./VacationCalendarDateList";
import DateListSelector from "./DateListSelector";
import store from "../../store";

function VacationCalendar ({availDays}) {
    const months = ['ЯНВ','ФЕВ','МАР','АПР','МАЙ','ИЮН','ИЮЛ','АВГ','СЕН','ОКТ','НОЯ','ДЕК'];
    const reserved = availDays.max - availDays.avail;
    const initialDate = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    };
    const  [dateInterval, setDateInterval] = useState(initialDate);

    function getMonthName(num) {
        return months[num]
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
        for (let i=2020; i<=2030; i++) yield i
    }
    function saveData() {

    }
    function clearSelectedList() {
        store.dispatch({
            type: 'CLEAR_VACATION_LIST'
        });
        store.dispatch({
            type: 'RESET_ACTIVE_VOCATION_DAYS'
        });
    }

    return (
        <div className={'calendar-wrapper'}>
            <div className={'calendar-header'}>
                <div className={'flex-center'}>
                    <i className={`material-icons${isPastMonth() ? ' unactive' : ''}`} onClick={decrementDate}>keyboard_arrow_left</i>
                    <i className="material-icons" onClick={incrementDate}>keyboard_arrow_right</i>
                    <div className={'vacation-info subtitle'}>
                        <span>Зарезервировано {reserved} дней(я)</span>
                        {reserved ? <i className="material-icons done-all" title={'Принять'} onClick={saveData}>done_all</i> : null}
                        {reserved ? <i className="material-icons clear-all" title={'Очистить все'} onClick={clearSelectedList}>clear_all</i> : null}
                    </div>
                </div>
                <div className={'flex-center current-date'}>
                    <DateListSelector dateList={months}
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
        availDays: state.activeVacationState
    }
};
export default  connect(mapStateToProps)(VacationCalendar)
