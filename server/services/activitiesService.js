import Activity from "../models/Activity.js";
import {ApiError} from "../exceptions/apiError.js";
import {getUserById} from "./usersService.js";

export async function getAllActivitiesForUser(userId) {
    return Activity.find({user: userId});
}

export async function getActivityById(activityId, userId) {
    const activity = await Activity.findOne({activityId});
    if (!activity) {
        throw ApiError.BadRequest("Нет такой активности");
    }
    const user = await getUserById(userId);
    if (activity.user === userId || user.isAdmin) {
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
    return Activity.create(activity);
}

export async function editActivity(activity, userId) {
    const act = await Activity.findOne({activityId: activity.activityId});
    console.log("found in db:", act);

    if (!act) {
        throw ApiError.BadRequest("Нет такой активности");
    }
    const user = await getUserById(userId);
    if (activity.user === userId || user.isAdmin) {
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
    if (act.user === userId || user.isAdmin) {
        return Activity.findOneAndRemove({activityId});
    }
    throw ApiError.NoAccessError();
}