import { LOAD_REPORTS, ReportActionTypes } from '../types/report';
import { AppThunk } from '../types/root';

export const fetchReports = (): AppThunk<Promise<void>> => async dispatch => {
    //fetch somewhere the reports
    await fakePromise();

    dispatch({
        type: LOAD_REPORTS,
        userReports: [ 'helloReport1' ]
    });
}

function fakePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    });
}