import { LOAD_REPORTS, Report, ReportActionTypes } from '../types/report';
import { AppThunk } from '../types/root';

export const fetchReports = (): AppThunk<Promise<void>> => async dispatch => {
    //fetch somewhere the reports
    await fakePromise();

    const action: ReportActionTypes = {
        type: LOAD_REPORTS,
        userReports: [{ id: 'r1', date: new Date(), location: 'Merida', description: 'Pues vi a un bato haciendo mamadas', ownerId: 'u1' }]
    };

    dispatch(action);
};

export const addReport = (report:Report): AppThunk<Promise<void>> => async dispatch => {
    await fakePromise();

    report['id'] = new Date().getTime()+'';
    
    const action: ReportActionTypes = {
        type: 'ADD_REPORT',
        report: report
    }; 

    dispatch(action);
};

function fakePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 500);
    });
}