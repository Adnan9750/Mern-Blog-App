import CommentModel from "../models/commentModel.js";

export const AddComment = async (req,res,next) => {
    try {
        const {commentContent,postId,userId} = req.body;
        if(userId !== req.user.userId){
            return res.status(403).json('You are not allowed to add a comment')
        }

        const addNewComment = new CommentModel({
            commentContent,
            postId,
            userId,
        });

        await addNewComment.save();

        res.status(200).json(addNewComment)

    } catch (error) {
        next(error);
    }
}