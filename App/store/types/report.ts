// Action types

export const LOAD_REPORTS = 'LOAD_REPORTS';

interface LoadreportAction {
    type: typeof LOAD_REPORTS,
    userReports: string[],
}

export type ReportActionTypes = LoadreportAction;


// state types

export interface ReportState {
    userReports: string[],
}