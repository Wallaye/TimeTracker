import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import * as activityController from "../controllers/activitityController.js"

const activitiesRouter = Router();

activitiesRouter.post('/activities/', authMiddleware, activityController.addActivity);
activitiesRouter.get('/activities/', authMiddleware, activityController.getAllActivitiesForUser);
activitiesRouter.get('/activities/:id', authMiddleware, activityController.getActivityById);
activitiesRouter.put('/activities/', authMiddleware, activityController.editActivity);
activitiesRouter.delete('/activities/:id', authMiddleware, activityController.deleteActivity);

/*activitiesRouter.post('/activities/', activityController.addActivity);
activitiesRouter.get('/activities/', activityController.getAllActivitiesForUser);
activitiesRouter.get('/activities/:id', activityController.getActivityById);
activitiesRouter.put('/activities/', activityController.editActivity);
activitiesRouter.delete('/activities/:id', activityController.deleteActivity);*/

export default activitiesRouter;