export interface IActivity {
    activityId: number,
    name: string,
    description: string,
    isActive: boolean,
    isFinished: boolean,
    startDate: string,
    finishDate: string,
    user: string,
    project: number
}