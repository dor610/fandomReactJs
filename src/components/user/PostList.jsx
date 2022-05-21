import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Post from "./Post";
import { getData, isLoggedIn } from "../../util/localStorage";
import style from "./user.module.css";
import { sendGetRequest } from "../../util/utils";
import { setPostIsReload } from "../../features/postSlice";

const PostList = ({account}) =>{

    const [page, setPage] = useState("approved");
    const [list, setList] = useState({});
    const isReload = useSelector(state => state.post.isReload);

    const dispatch = useDispatch();

    useEffect(() =>{
       loadData();
    }, [page]);

    useEffect(() =>{
        if(isReload){
            loadData();
        }
    }, [isReload]);
    
    const loadData = () =>{
        dispatch(setPostIsReload(false));
        switch(page){
            case "approved": 
                loadApproved();
                break;
            case "pending":
                loadPending();
                break;
            case "locked":
                loadLocked();
                break;
            case "deleted":
                loadDeleted();
                break;
            default: break;                            
        }
    }

    const loadApproved = async () =>{
        let res = await sendGetRequest(`/post/get/${account}/approved`);
        if(res.status === 200){
            setList(res.data);
        }
    }
    const loadPending = async () =>{
        let res = await sendGetRequest(`/post/get/${account}/pending`);
        if(res.status === 200){
            setList(res.data);
        }
    }

    const loadDeleted = async() =>{
        let res = await sendGetRequest(`/post/get/${account}/deleted`);
        if(res.status === 200){
            setList(res.data);
        }
    }

    const loadLocked = async () =>{
        let res = await sendGetRequest(`/post/get/${account}/locked`);
        if(res.status === 200){
            setList(res.data);
        }
    }

    return (
        <div className={style.postList}>
            <div className={isLoggedIn()? JSON.parse(getData("user")).role === "ADMIN"? "": style.hide: style.hide}>
                <button onClick={e => setPage("approved")} className={page==="approved"? style.active: ""}>Bài viết đã duyệt</button>
                <button onClick={e => setPage("pending")}  className={page==="pending"? style.active: ""}>Bài viết đang chờ duyệt</button>
                <button onClick={e => setPage("locked")}  className={page==="locked"? style.active: ""}>Bài viết bị khoá</button>
                <button onClick={e => setPage("deleted")}  className={page==="deleted"? style.active: ""}>Bài viết bị xoá</button>
            </div>
            <div>
                {Object.keys(list).map((p, i) =>{
                    return <Post post={list[p]} key={"p_i_"+i}/>
                })}
            </div>
        </div>
    )

}

export default PostList;