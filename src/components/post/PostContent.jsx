import MediaViewer from "../basics/MediaViewer";
import style from "./post.module.css";  
import TextEditor from "../editor/TextEditor";
import { Link } from "react-router-dom";

const PostContent = ({post, isViewed = true}) =>{
    //console.log(post);
    
    return (
        <div className={style.postContent}>
            {isViewed? <div>{post.title}</div> : 
            <Link to={`/post/comment/${post.id}`}><div>{post.title}</div> </Link>}
             {post.postContent? isViewed? <TextEditor type={"display"} data={post.postContent} />:
             <Link to={`/post/comment/${post.id}`}><TextEditor type={"display"} data={post.postContent} /></Link>: <div></div>}
            {post.type === "IMAGE"?
                <MediaViewer isViewed={isViewed} images={post.images} type={post.type}/>: <></>}   
            {post.type === "VIDEO"?
                <MediaViewer isViewed={isViewed} video={post.video} type={post.type}/>: <></>} 
            {post.type === "IMAGE_VIDEO"? 
                <MediaViewer isViewed={isViewed} images={post.images} video={post.video} type={post.type}/>: <></>}  
        </div>
    );
}

export default PostContent;