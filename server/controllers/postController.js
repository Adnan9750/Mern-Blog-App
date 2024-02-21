import PostModel from "../models/postModel.js";

export const createPost = async (req, res, next) => {
    console.log(req.user);
    if(!req.user.isAdmin){
        return res.status(403).json('You are not allowed to create a post')
    }
    if(!req.body.title || !req.body.content){
        return res.status(400).json('Please fill all required fields')
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new PostModel({
        ...req.body,
        slug,
        userID:req.user.userId
    });

    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
}