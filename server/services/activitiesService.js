import Activity from "../models/Activity.js";
import {ApiError} from "../exceptions/apiError.js";
import {getUserById} from "./usersService.js";
import {editProject, getProjectById} from "./projectsService.js";

export async function getAllActivitiesForUser(userId) {
    return Activity.find({user: userId});
}

export async function getActivityById(activityId, userId) {
    const activity = await Activity.findOne({activityId});
    if (!activity) {
        throw ApiError.BadRequest("Нет такой активности");
    }
    const user = await getUserById(userId);
    if (activity.user == userId || user.isAdmin) {
        return activity;
    }
    throw ApiError.NoAccessError();
}

export async function addActivity(activity) {
    const activities = await Activity.find();
    let maxIndex = -1;
    for (const _activity of activities) {
        if (_activity.activityId > maxIndex) {
            maxIndex = _activity.activityId;
        }
    }
    activity.activityId = maxIndex + 1;
    console.log("Act", activity)
    if (activity.project != -1) {
        const proj = await getProjectById(activity.project, activity.user);
        let project = {
            _id: proj._id,
            name: proj.name,
            projectId: proj.projectId,
            activities: [...proj.activities, activity.activityId],
            user: proj.user,
            __v: proj.__v
        }
        await editProject(project, activity.user);
    }
    return Activity.create(activity);
}

export async function editActivity(activity, userId) {
    const act = await Activity.findOne({activityId: activity.activityId});
    if (!act) {
        throw ApiError.BadRequest("Нет такой активности");
    }
    const user = await getUserById(userId);
    if (activity.user == userId || user.isAdmin) {
        console.log("1x");
        console.log(activity.project);
        console.log(activity.project, act.project);
        if (activity.project != act.project) {
            console.log("2x");
            if (activity.project == -1) {
                console.log("3x")
                let proj
                try {
                    proj = await getProjectById(act.project, userId)
                } catch (e){
                    proj = null
                }
                if (proj) {
                    console.log("5x");
                    const index = proj.activities.findIndex(el => el == act.activityId)
                    let project = {
                        _id: proj._id,
                        name: proj.name,
                        projectId: proj.projectId,
                        activities: [...proj.activities.slice(0, index), ...proj.activities.slice(index + 1)],
                        user: proj.user,
                        __v: proj.__v
                    }
                    await editProject(project, userId)
                }
            } else {
                console.log("4x")
                if (act.project != -1) {
                    let proj = await getProjectById(act.project, userId);
                    console.log("proj", proj);
                    console.log(act.project);
                    const index = proj.activities.findIndex(el => el == act.activityId)
                    console.log("index", index);
                    let project = {
                        _id: proj._id,
                        name: proj.name,
                        projectId: proj.projectId,
                        activities: [...proj.activities.slice(0, index), ...proj.activities.slice(index + 1)],
                        user: proj.user,
                        __v: proj.__v
                    }
                    console.log("PROJECT", project);
                    await editProject(project, userId);
                }
                let proj = await getProjectById(activity.project, userId);
                let project = {
                    _id: proj._id,
                    name: proj.name,
                    projectId: proj.projectId,
                    activities: [...proj.activities, activity.project],
                    user: proj.user,
                    __v: proj.__v
                }
                await editProject(project, userId);
            }
        }
        console.log(act.project);
        return Activity.findOneAndUpdate({activityId: act.activityId}, activity, {new: true});
    }
    throw ApiError.NoAccessError();
}

export async function deleteActivity(activityId, userId) {
    const act = await Activity.findOne({activityId: activityId});
    if (!act) {
        throw ApiError.BadRequest("Нет такой активности");
    }
    const user = await getUserById(userId);
    if (act.user == userId || user.isAdmin) {
        const proj = await getProjectById(act.project, userId);
        const index = proj.activities.findIndex(el => el == act.activityId);
        console.log(index);
        let project = {
            _id: proj._id,
            name: proj.name,
            projectId: proj.projectId,
            activities: [...proj.activities.slice(0, index), ...proj.activities.slice(index + 1)],
            user: proj.user,
            __v: proj.__v
        }
        console.log("DELETE", project);
        await editProject(project, userId);
        return Activity.findOneAndRemove({activityId});
    }
    throw ApiError.NoAccessError();
}