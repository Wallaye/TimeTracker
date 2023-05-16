import mongoose from "mongoose";

const User = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
})

export default mongoose.model('Users', User);