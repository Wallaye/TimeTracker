import api from "../http";
import {IProject} from "../models/IProject";

export default class ProjectService{
    static async getProjects(){
        return await api.get<IProject[]>('/projects/');
    }
    static async getProject(id: number){
        return await api.get<IProject>('/projects/' + id);
    }
    static async addProject(project: IProject){
        return await api.post('/projects/', {project})
    }
    static async editProject(project: IProject, user: string){
        return await api.put('/projects/', {project, user});
    }
    static async deleteProject(id: number){
        return await api.delete('/projects/' + id);
    }
}