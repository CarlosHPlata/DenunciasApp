import { combineReducers } from "redux";

import ReportReducer from './report';

export const rootReducer = combineReducers({
    reports: ReportReducer
});