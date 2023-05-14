import Project from "../models/Project.js";
import {ApiError} from "../exceptions/apiError.js";
import Activity from "../models/Activity.js";
import {getUserById} from "./usersService.js";

export async function getAllProjectForUser(userId) {
    return Project.find({user: userId});
}

export async function getProjectById(projectId, userId) {
    const project = await Project.findOne({projectId});
    if (!project) {
        throw ApiError.BadRequest("Нет такого проекта");
    }
    const user = await getUserById(userId);
    if (project.user === userId || user.isAdmin) {
        return project;
    }
    throw ApiError.NoAccessError();
}

export async function addProject(project) {
    const projects = await Project.find();
    let maxIndex = -1;
    for (const _p of projects) {
        if (_p.projectId > maxIndex) {
            maxIndex = _p.projectId
        }
    }
    project.projectId = maxIndex + 1;
    return Project.create(project);
}

export async function editProject(project, userId) {
    const proj = await Project.findOne({projectId: project.projectId});
    if (!proj) {
        throw ApiError.BadRequest("Нет такого проекта");
    }
    const user = await getUserById(userId);
    if (proj.user === userId || user.isAdmin) {
        return Project.findOneAndUpdate({projectId: proj.projectId}, project, {new: true});
    }
    throw ApiError.NoAccessError();

}

export async function deleteProject(projectId, userId) {
    const proj = await Project.findOne({projectId: projectId});
    if (!proj) {
        throw ApiError.BadRequest("Нет такого проекта");
    }
    const user = await getUserById(userId);
    if (proj.user === userId || user.isAdmin) {
        return Project.findOneAndRemove({projectId});
    }
    throw ApiError.NoAccessError();
}
