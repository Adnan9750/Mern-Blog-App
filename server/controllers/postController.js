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

export const getPosts = async (req,res,next) => {
    try {
        // this start is for pagination mean if in query if there is some specific value then start from that
        // otherwise it always start from zero
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const orderDirection = req.query.order === 'asc' ? 1 : -1 
        const posts = await PostModel.find({
            ...(req.query.userID && {userID: req.query.userID}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                // this $or is for that it check the search term data in both title and content of post
                // and then give that data
                $or : [
                    // this option 'i' is for either upper or lower case this not matter
                    { title: {$regex: req.query.searchTerm, $options: 'i'} },
                    { content: {$regex: req.query.searchTerm, $options: 'i'} }
                ],
            }),
        }).sort({updatedAt:orderDirection}).skip(startIndex).limit(limit)

        const totalPosts = await PostModel.countDocuments()

        const nowDate = new Date();

        const oneMonthAgo = new Date(
            nowDate.getFullYear(),
            nowDate.getMonth() - 1,
            nowDate.getDate()
        );

        const lastMonthPosts = await PostModel.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })

    } catch (error) {
        next(error)
    }
}