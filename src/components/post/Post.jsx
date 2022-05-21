import PostFuncBar from "./PostFuncBar";
import PostTitle from "./PostTitle";
import PostContent from "./PostContent";
import style from "./post.module.css";
import { Link } from "react-router-dom";

const Post = ({type, isPostView = false, post= {}}) =>{
    //console.log(post);
    /**
     {isPostView? (<PostContent title={post.title} content={post.postContent} /> ) :
             (<Link to={`post/${post.id}`} >
                <PostContent post={post} />    
                </Link>)}
     */
    if(post){
        return (
            <div className={style.post}>
                <PostTitle author={post.author} timestamp={post.timestamp} />
                <PostContent post={post} isViewed={isPostView}/>
                <PostFuncBar isViewed={isPostView} author={post.author} targetId={post.id} type={type} />
            </div>
        )
    }
}

export default Post;