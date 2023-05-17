import * as PS from "../services/projectsService.js";

export async function getAllProjectsForUser(req, res){
    try {
        const {userId} = req.user;
        const activities = await PS.getAllProjectForUser(userId);
        res.json(activities);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function getProjectById(req, res){
    try {
        const {id} = req.params;
        const {userId} = req.user;
        const project = await PS.getProjectById(id, userId);
        console.log(project);
        res.json(project);
    } catch(e){
        res.status(e.status).json(e);
    }
}

export async function editProject(req, res){
    try {
        console.log("Project got", req.body);
        let project = req.body.project;
        let proj = await PS.editProject(project, req.body.userId);
        console.log("activity saved", proj);
        res.json(proj);
    } catch (e){
        res.status(e.status).json(e)
    }
}

export async function addProject(req, res){
    try {
        let {project} = req.body;
        console.log(req.body)
        let proj = await PS.addProject(project);
        console.log("db", proj)
        res.json(proj);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function deleteActivity(req, res){
    try{
        let projectId = req.params.id;
        const {userId} = req.user;
        let proj = await PS.deleteProject(projectId, userId);
        res.json(proj);
    } catch (e){
        res.status(e.status).json(e)
    }
}