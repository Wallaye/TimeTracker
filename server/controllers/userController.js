import * as userService from "../services/usersService.js";

export async function getUser(req, res, next) {
    try {
        const {userId} = req.body;
        const userData = await userService.getUserById(userId);
        return res.json(userData);
    } catch (e) {
        next(e)
    }
}

export async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (e) {
        next(e)
    }
}