import mongoose, {Schema} from "mongoose";

const Project = new mongoose.Schema({
    projectId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    activities: [{type: Schema.Types.ObjectId}],
    user: {type: Schema.Types.ObjectId, ref: "Users"}
})

export default mongoose.model("Projects", Project)