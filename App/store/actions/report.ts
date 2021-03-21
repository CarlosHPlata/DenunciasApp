import { LOAD_REPORTS, Report, ReportActionTypes } from '../types/report';
import { AppThunk } from '../types/root';

import ENV from '../../../env';

export const fetchReports = (): AppThunk<Promise<void>> => async dispatch => {

    try {
        const response = await fetch(`${ENV.firebaseUrl}reports/u2.json`);

        if (!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        const loadedReports:Report[] = [];

        for (let key in resData) {
            loadedReports.push({ 
                id: key, 
                date: new Date(resData[key].date), 
                location: resData[key].location, 
                description: resData[key].description, 
                state: resData[key].state, 
                ownerId: 'u2' 
            });
        }

        const action: ReportActionTypes = {
            type: LOAD_REPORTS,
            userReports: loadedReports
        };

        dispatch(action);
    } catch (err){
        throw err;
    }
};



export const addReport = (report:Report): AppThunk<Promise<void>> => async dispatch => {
    const state = 'iniciada';

    try {
        const response = await fetch(`${ENV.firebaseUrl}reports/u2.json`, {
            method: 'POST',
            headers: {'Content-Type': 'application.json'},
            body: JSON.stringify({date: report.date, location: report.location, description: report.description, state})
        });

        
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();

        report['id'] = resData.name+'';
        report['state'] = state;

        const action: ReportActionTypes = {
            type: 'ADD_REPORT',
            report: report
        }; 

        dispatch(action);
    } catch (err) {
        throw err;
    }
};