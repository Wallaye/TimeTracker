import mongoose, {Schema} from "mongoose";

const Activity = new mongoose.Schema({
    activityId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    isActive: {type: Boolean, default: false},
    isFinished: {type: Boolean, default: false},
    startDate: {type: Date, default: Date.now()},
    finishDate: {type: Date, default: null},
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    project: {type: Schema.Types.ObjectId, ref: "Projects", default: null}
})

export default mongoose.model('Activities', Activity)