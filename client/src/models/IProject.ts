import {IActivity} from "./IActivity";

export interface IProject {
    projectId: number,
    name: string,
    activities: number[],
    user: string
}