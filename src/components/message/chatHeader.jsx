import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMessageCurrentName } from "../../features/messageSlice";
import { sendGetRequest } from "../../util/utils";
import style from "./message.module.css"

const ChatHeader = () =>{
    const userId = useSelector(state => state.message.current.user);
    const [userStatus, setUserStatus] = useState(false);
    const [userName, setUserName] = useState("Người dùng");
    const [avatar, setAvatar] = useState("https://www.dropbox.com/s/wm9xcmn2z82yydi/avatar.png?raw=1");
    
    const dispatch = useDispatch();

    useEffect(() =>{
        if(userId){
            loadStatus();
            loadUserData();
        }
    }, [userId])

    const loadStatus = async () =>{
        let res = await sendGetRequest(`/message/user/isOnline/${userId}`);
        if(res.status === 200){
            setUserStatus(res.data);
        }else{
            setUserStatus(false);
        }
    }
    const loadUserData = async () =>{
        let res = await sendGetRequest(`/user/basic/${userId}`)
        if(res.status === 200){
            setUserName(res.data.userName);
            dispatch(setMessageCurrentName(res.data.userName));
            setAvatar(res.data.avatar);
        }
    }

    return (
        <div className={style.chatHeader}>
            <img src={avatar} alt="" />
            <Link to={`/user/${userId}`}>{userName}</Link>
            <div>{userStatus? "Đang hoạt động": "Không hoạt động"}</div>
        </div>
    )
}

export default ChatHeader;