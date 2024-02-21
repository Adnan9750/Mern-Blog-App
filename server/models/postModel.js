
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userID:{
            type : String,
            required: true,
        },
        content:{
            type : String,
            required: true,
        },
        title:{
            type : String,
            required: true,
            unique : true
        },
        image:{
            type : String,
            default : 'https://marketplace.canva.com/EAEaFaJ4g34/2/0/1600w/canva-simple-blog-post-instagram-post-lmthgAhZcag.jpg'
        },
        category:{
            type:String,
            default:'uncategorized'
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
    },{timestamps:true}
)

const PostModel = mongoose.model('Posts',postSchema)

export default PostModel
// https://wordtracker-swoop-uploads.s3.amazonaws.com/uploads/ckeditor/pictures/1247/content_wordtracker_blog_article_image.jpg