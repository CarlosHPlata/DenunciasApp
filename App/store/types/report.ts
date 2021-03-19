// Action types

export const LOAD_REPORTS = 'LOAD_REPORTS';

export interface Report {
    id: string | null | undefined
    date: Date,
    location: string,
    description: string,
    ownerId: string,
}

interface LoadreportAction {
    type: typeof LOAD_REPORTS,
    userReports: Report[],
}

export type ReportActionTypes = LoadreportAction;


// state types

export interface ReportState {
    userReports: Report[],
}