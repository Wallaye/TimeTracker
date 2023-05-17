import Project from "../models/Project.js";
import {ApiError} from "../exceptions/apiError.js";
import Activity from "../models/Activity.js";
import {getUserById} from "./usersService.js";
import {editActivity, getActivityById} from "./activitiesService.js";

export async function getAllProjectForUser(userId) {
    return Project.find({user: userId});
}

export async function getProjectById(projectId, userId) {
    const project = await Project.findOne({projectId});
    if (!project) {
        throw ApiError.BadRequest("Нет такого проекта");
    }
    const user = await getUserById(userId);
    if (project.user == userId || user.isAdmin) {
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
    console.log("EDIT", project);
    const proj = await Project.findOne({projectId: project.projectId});
    console.log(proj);
    if (!proj) {
        throw ApiError.BadRequest("Нет такого проекта");
    }
    const user = await getUserById(userId);
    if (proj.user == userId || user.isAdmin) {
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
    if (proj.user == userId || user.isAdmin) {
        for (const el of proj.activities) {
            const act = await getActivityById(el, userId);
            let activity = {
                _id: act._id,
                activityId: act.activityId,
                name: act.name,
                project: -1,
                startDate: act.startDate,
                finishDate: act.finishDate,
                description: act.description,
                user: act.user,
                isActive: act.isActive,
                isFinished: act.isFinished,
                __v: act.__v
            }
            editActivity(activity, userId);
        }
        return Project.findOneAndRemove({projectId});
    }
    throw ApiError.NoAccessError();
}
