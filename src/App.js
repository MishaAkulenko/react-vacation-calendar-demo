import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainContainerComponent from "./components/MainContainer";

import 'normalize.css';
const SavedUser = localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser'));

store.dispatch({
    type: 'SET_USER_INFO',
    user: SavedUser
});
store.dispatch({
    type: 'SET_MAX_ACTIVE_VOCATION_DAYS',
    availDays: SavedUser && SavedUser.vacation_days,
});
export default function App() {
    return (
      <Provider store={store}>
          <MainContainerComponent/>
      </Provider>
  );
}

