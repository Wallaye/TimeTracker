import Project from "../models/Project.js";
import {ApiError} from "../exceptions/apiError.js";
import Activity from "../models/Activity.js";

export async function getAllProjectForUser(userId){
    return Project.find({user: userId});
}

export async function getProjectById(projectId, userId){
    const project = await Project.findOne({projectId});
    if (!project){
        throw ApiError.BadRequest("Нет такого проекта");
    }
    if (project.user !== userId){
        throw ApiError.NoAccessError();
    }
    return project;
}

export async function addProject(project){
    const projects = await Project.find();
    let maxIndex = -1;
    for (const _p of projects){
        if (_p.projectId > maxIndex){
            maxIndex = _p.projectId
        }
    }
    project.projectId = maxIndex + 1;
    return Project.create(project);
}

export async function editProject(project, userId){
    const proj = await Project.findOne({projectId: project.projectId});
    if (!proj){
        throw ApiError.BadRequest("Нет такого проекта");
    }
    if (proj.user !== userId){
        throw ApiError.NoAccessError();
    }

    return Project.findOneAndUpdate({projectId: proj.projectId}, project, {new: true});
}

export async function deleteProject(projectId, userId){
    const proj = await Project.findOne({projectId: projectId});
    if (!proj){
        throw ApiError.BadRequest("Нет такого проекта");
    }
    if (proj.user !== userId){
        throw ApiError.NoAccessError();
    }
    return Project.findOneAndRemove({projectId});
}
