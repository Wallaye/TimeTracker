import {ApiError} from "../exceptions/apiError.js";
import * as tokenService from '../services/tokenService.js';

export default function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        console.log("ADS", req.user);
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}