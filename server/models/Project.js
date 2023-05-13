import mongoose, {Schema} from "mongoose";

const Project = new mongoose.Schema({
    projectId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    activities: [Schema.Types.ObjectId],
    user: {type: Schema.Types.ObjectId, ref: "users"}
})

export default mongoose.model("Projects", Project)