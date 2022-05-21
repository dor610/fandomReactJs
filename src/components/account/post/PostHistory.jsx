import style from "./post.module.css";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect, useState } from "react";
import { Failed, Idle, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest } from "../../../util/utils";
import PostHistoryElement from "./PostHistoryElement";


const PostHistory = ({id}) =>{

    const [status, setStatus] = useState(Idle);
    const [history, setHistory] = useState({});
    const [isShowing, setIsShowing] = useState(false);
    const [label, setLabel] = useState("Xem lịch sử");


    useEffect(() =>{
        loadLog();
    },[]);


    const loadLog = async () =>{
        let res = await sendAuthGetRequest(`/post/log/${id}`);
        if(res.status === 200){
            setHistory(res.data);
            setStatus(Succeed);
        }else{
            setStatus(Failed);
        }
    }

    const onClick = () =>{
        if(isShowing) setLabel("Xem lịch sử");
        else setLabel("Thu nhỏ");
        setIsShowing(!isShowing);
    }

    return (
        <div className={style.postHistory}>
            <div className={isShowing? "": style.hide}>Lịch sử của bài viết:</div>
            <div className={isShowing? style.hitoryList : style.hide}>
                {Object.keys(history).map((h, i) =>{
                    return <PostHistoryElement history={history[h]} key={"post_history_"+h} />
                })}
            </div>
            <LoadingAnimation msg="Đang tải lịch sử" showing={status === Pending}/>
            <div className={style.postHistoryBtn}>
                <div onClick={onClick}>{label}</div>
            </div>
        </div>
    )
}


export default PostHistory;