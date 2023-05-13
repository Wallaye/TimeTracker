import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import * as PC from "../controllers/projectController.js"

const projectsRouter = Router();

projectsRouter.post('/projects', authMiddleware, PC.addProject)
projectsRouter.get('/projects', authMiddleware, PC.getAllProjectsForUser)
projectsRouter.get('/projects/:id', authMiddleware, PC.getProjectById)
projectsRouter.put('/projects', authMiddleware, PC.editProject)
projectsRouter.delete('/projects/:id', authMiddleware, PC.deleteActivity);

export default projectsRouter;