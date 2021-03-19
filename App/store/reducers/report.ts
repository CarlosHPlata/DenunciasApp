import { LOAD_REPORTS, ReportActionTypes, ReportState } from '../types/report';

const initialState: ReportState = {
    userReports: []
};

export default (state = initialState, action:ReportActionTypes): ReportState => {
    switch (action.type) {

        case LOAD_REPORTS: 
            return { ...state, userReports: action.userReports };

        default:
            return state;
    }
}