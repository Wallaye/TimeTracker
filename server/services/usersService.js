import User from "../models/User.js";
import {UserDto} from "../dtos/userDto.js";

export async function getUserById(userId){
    const user = await User.findById(userId);
    return new UserDto(user);
}

export async function getAllUsers(){
    const users = await User.find();
    const result = [];
    for (let user in users) {
        result.append(new UserDto(user));
    }
    return result;
}
