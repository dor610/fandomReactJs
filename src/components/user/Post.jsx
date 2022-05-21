import { useEffect, useState } from "react";
import { getData, isLoggedIn } from "../../util/localStorage";
import { sendGetRequest } from "../../util/utils";
import PostFuncBar from "../account/post/PostFuncBar";
import PostHistory from "../account/post/PostHistory";
import PostContent from "../post/PostContent";
import PostTitle from "../post/PostTitle";
import style from "./user.module.css";

const Post = ({post, removeFunc}) =>{
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() =>{
        getTimestamp();
    })

    const processType = () =>{
        switch(post.state){
            case "PENDING": return "pending_post";
            case "LOCKED": return "locked_post";
            case "APPROVED": return "admin_approved";
            default: return "deleted";
        }
    }

    const getTimestamp = async () =>{
        let res = await sendGetRequest(`/post/log/timestamp/${post.id}/${post.state}`);
        if(res.status ===200){
            setTimestamp(parseInt(res.data));
        }
    } 
    return (
        <div className={style.post}>
            <PostTitle inActive={true} author={post.author} timestamp={timestamp} />
            <PostContent isViewed={post.state === "APPROVED"? false: true} post={post} />
            {isLoggedIn()? JSON.parse(getData("user")).role === "ADMIN" ?<PostFuncBar type={processType()} id={post.id}/>: <></>:<></>}
            {isLoggedIn()? JSON.parse(getData("user")).role === "ADMIN" ?<PostHistory id={post.id} />: <></>:<></>}
        </div>
    )
}

export default Post;