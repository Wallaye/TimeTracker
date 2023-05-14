import {ApiError} from "../exceptions/apiError.js";

export default function (req, res, next) {
    try {
        const {user} = req;
        if (!user.isAdmin) {
            return next(ApiError.NoAccessError())
        }
        next();
    } catch (e) {
        return next(ApiError.NoAccessError())
    }
}