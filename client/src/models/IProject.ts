import {IActivity} from "./IActivity";

export interface IProject {
    projectId: number,
    name: String,
    activities: IActivity[],
    user: string
}