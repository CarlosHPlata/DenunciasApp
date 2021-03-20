import { ADD_REPORT, LOAD_REPORTS, ReportActionTypes, ReportState } from '../types/report';

const initialState: ReportState = {
    userReports: []
};

export default (state = initialState, action:ReportActionTypes): ReportState => {
    switch (action.type) {

        case LOAD_REPORTS: 
            return { ...state, userReports: action.userReports };

        case ADD_REPORT:
            return { ...state, userReports: state.userReports.concat( action.report )}

        default:
            return state;
    }
}