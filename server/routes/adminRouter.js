import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import * as userController from "../controllers/userController.js";

const adminRouter = Router();

adminRouter.get('/users/', authMiddleware, adminMiddleware, userController.getAllUsers);
adminRouter.get('/users/:id', authMiddleware, adminMiddleware, userController.getUser);

export default adminRouter;