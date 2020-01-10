import React from "react";
import VacationDayItem from "./VacationCalendarDayItem";
import {useEffect} from 'react';
import {DAYS_NAMES as days}  from '../../config/const.js';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../actions/actions";
function VacationCalendarDateList({dateInterval, fetchUsersVacationList}) {

    useEffect(()=>{
        fetchUsersVacationList();
    },[fetchUsersVacationList]);

    function getDaysInMonth (year, month) {
        return 33 - new Date(year, month, 33).getDate();
    }
    function getNumberOfFirstDayInMonth() {
        let date = new Date(dateInterval.year, dateInterval.month, 1);
        return date.getDay() - 1;
    }
    function generateDates() {
        const prevMonthDaysQuantity = getDaysInMonth (dateInterval.year, dateInterval.month - 1);
        const CELLS_IN_GRID = 35;
        const calendar = [];

        function* generatePrevMonth() {
            if (getNumberOfFirstDayInMonth() === 0) return [];
            for (let i=prevMonthDaysQuantity - getNumberOfFirstDayInMonth(); i <= prevMonthDaysQuantity; i++) yield new Date(dateInterval.year, dateInterval.month - 1, i);
        }
        function* generateCurrentMonth() {
            for (let i=1; i <= getDaysInMonth (dateInterval.year, dateInterval.month); i++) yield new Date(dateInterval.year, dateInterval.month, i);
        }
        calendar.push([...generatePrevMonth()]);
        calendar.push([...generateCurrentMonth()]);

        const daysInNextMonth = CELLS_IN_GRID - calendar[0].length - calendar[1].length;
        function* generateNextMonth() {
            for (let i=1; i <= daysInNextMonth; i++) yield new Date(dateInterval.year, dateInterval.month + 1, i);
        }
        calendar.push([...generateNextMonth()]);

        return calendar;
    }

    return (
        <div className={'calendar-body'}>
            {
                days.map((name, key)=>{
                    return <div key={key} className={`grid-cell flex-center`}>{name}</div>
                })
            }
            {
                generateDates().map((month, monthNumber)=>{
                    return  month.map((day)=>{
                        return (
                            <VacationDayItem key={day.getTime()}
                                             className={`${monthNumber === 0 || monthNumber === 2 ? ' not-current' : ''}`}
                                             date={day}
                            />
                        )
                    })
                })
            }

        </div>
    )
}
const  mapDispatchToProps = (dispatch) =>{
    return {
        fetchUsersVacationList: bindActionCreators(actions.fetchUsersVacationList, dispatch)
    }
};
export default connect(null, mapDispatchToProps)(VacationCalendarDateList);
