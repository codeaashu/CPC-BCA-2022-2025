import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            requiired: true
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        comment:{
            type:Schema.Types.ObjectId,
            ref:"Comment"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

    },{timestamps: true}
);


commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema)