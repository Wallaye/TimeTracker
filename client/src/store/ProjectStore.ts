import {IProject} from "../models/IProject";
import {makeAutoObservable} from "mobx";
import ProjectService from "../services/projectService";

export default class ProjectStore{
    isLoading = false;
    projects: IProject[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    setLoading(loading: boolean){
        this.isLoading = loading;
    }

    setProjects(projects: IProject[]){
        this.projects = projects;
    }
    async getProjects(){
        this.setLoading(true);
        try {
            const response = await ProjectService.getProjects();
            this.setProjects(response.data);
        }catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally {
            this.setLoading(false);
        }
    }
}