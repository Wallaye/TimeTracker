import * as actService from "../services/activitiesService.js"

export async function getAllActivitiesForUser(req, res){
    try {
        const {userId} = req.user;
        const activities = await actService.getAllActivitiesForUser(userId);
        res.json(activities);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function getActivityById(req, res){
    try {
        const {id} = req.params;
        const {userId} = req.user;
        const activity = await actService.getActivityById(id, userId);
        res.json(activity);
    } catch (e){
        res.status(e.status).json(e)
    }
}

export async function editActivity(req, res){
    try {
        console.log("Activity got", req.body);
        let activity = req.body.activity;
        let act = await actService.editActivity(activity, req.body.userName);
        console.log("activity saved", act);
        res.json(act);
    } catch (e){
        res.status(e.status).json(e)
    }
}
export async function addActivity(req, res){
    try {
        let {activity} = req.body;
        console.log(req.body)
        let act = await actService.addActivity(activity);
        console.log("db", act)
        res.json(activity);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function deleteActivity(req, res){
    try{
        let activityId = req.params.id;
        const {userName} = req.user;
        let act = await actService.deleteActivity(activityId, userName);
        res.json(act);
    } catch (e){
        res.status(e.status).json(e)
    }
}