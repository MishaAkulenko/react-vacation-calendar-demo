import React from "react";
import ProfileSettingsIcon from "../../components/ProfileSettingsIcon";
import {connect} from 'react-redux';
import './HomePage.scss'
import VacationCalendar from "../../components/VacationCalendar/VacationCalendar";
import {getDateLocale} from "../../utils/utils";

function HomePage ({availDays}) {

    return (
        <div className={'home-page container'}>
            <header>
                <div>
                    <div className={'vacation-info'}>Вам доступно {availDays.avail} {getDateLocale(availDays.avail, 'days')} отпуска</div>

                </div>
                <ProfileSettingsIcon/>
            </header>
            <main>
                <VacationCalendar/>
            </main>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        availDays: state.vacationState.availDaysToVacation
    }
};
export default  connect(mapStateToProps)(HomePage)
