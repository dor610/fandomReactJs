import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsBottom } from "../../../features/variable/variableSlice";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest } from "../../../util/utils";
import LoadingAnimation from "../../LoadingAnimation";
import Post from "./Post";
import style from "./post.module.css";

const Deleted = ({account}) =>{

    const [posts, setPosts] = useState({});
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(Idle);
    const [count, setCount] = useState(0);

    const isBottom = useSelector(state => state.variable.isBottom);
    const dispatch = useDispatch();


    useEffect(() =>{
        loadPost();
        getCount();
    }, []);

    useEffect(() =>{
        if(isBottom){
            loadPost();
        }
    });

    const loadPost = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);
            let res = await sendAuthGetRequest(`/post/user/${account}/deleted/${page}`);
            console.log(res);
            if(res.status === 200){
                if(Object.keys(res.data).length === 0){
                    setStatus(NoContent);
                    dispatch(setIsBottom(false));
                }else{
                    setStatus(Succeed);
                    setPosts({...posts,...res.data});
                    setPage(page + 1);
                    dispatch(setIsBottom(false));
                }
            }else{
                dispatch(setIsBottom(false));
                setStatus(Failed);
            }
        }
    }

    const getCount = async() =>{
        let res = await sendAuthGetRequest(`/post/deleted/count/${account}`);
        console.log(res);
        if(res.status === 200){
            setCount(res.data);
        }
    }



    return (
        <div className={style.pending}>
            <div>Có {count} bài viết đã bị xoá</div>
            <div>
                {Object.keys(posts).map((p, i) =>{
                    return <Post post={posts[p]} key={"user_deleted_post_"+i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={status === Pending} msg='Đang tải'/>
            </div>
        </div>
    )
}   

export default Deleted;