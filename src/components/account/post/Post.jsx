import { useEffect, useState } from "react";
import { sendGetRequest } from "../../../util/utils";
import PostContent from "../../post/PostContent";
import PostTitle from "../../post/PostTitle";
import style from "./post.module.css";
import PostFuncBar from "./PostFuncBar";
import PostHistory from "./PostHistory";

const Post = ({post, type}) =>{

    const [timestamp, setTimestamp] = useState(0);

    useEffect(() =>{
        getTimestamp();
    })

    const getTimestamp = async () =>{
        let res = await sendGetRequest(`/post/log/timestamp/${post.id}/${post.state}`);
        if(res.status ===200){
            setTimestamp(parseInt(res.data));
        }
    }

    return (
        <div className={style.post}>
            <PostTitle author={post.author} timestamp={timestamp} inActive={true} />
            <PostContent post={post} />
            <PostFuncBar id={post.id} type={type}/>
            <PostHistory id={post.id}/>
        </div>
    )
}

export default Post;