// Action types

export const LOAD_REPORTS = 'LOAD_REPORTS';
export const ADD_REPORT = 'ADD_REPORT';

export interface Report {
    id?: string | null | undefined
    date: Date,
    location: string,
    description: string,
    ownerId: string,
}

interface LoadReportAction {
    type: typeof LOAD_REPORTS,
    userReports: Report[],
}

interface AddReportAction {
    type: typeof ADD_REPORT,
    report: Report,
}

export type ReportActionTypes = LoadReportAction | AddReportAction;


// state types

export interface ReportState {
    userReports: Report[],
}