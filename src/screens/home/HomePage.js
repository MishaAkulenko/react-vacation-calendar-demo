import React from "react";
import ProfileSettingsIcon from "../../components/ProfileSettingsIcon";
import {connect} from 'react-redux';
import './HomePage.scss'
import VacationCalendar from "../../components/VacationCalendar/VacationCalendar";

function HomePage ({availDays}) {

    return (
        <div className={'home-page container'}>
            <header>
                <div>
                    <div className={'vacation-info'}>Вам доступно {availDays.avail} дней(я) отпуска</div>

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
        availDays: state.activeVacationState
    }
};
export default  connect(mapStateToProps)(HomePage)
