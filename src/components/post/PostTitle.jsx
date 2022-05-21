import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import style from "./post.module.css";
import { useEffect, useState } from "react";
import { miliSecToTime, sendAuthGetRequest } from "../../util/utils";
import { Link } from "react-router-dom";
import { getData, isLoggedIn, setData } from "../../util/localStorage";


const PostTitle = ({inActive = false, author, timestamp}) =>{
   // console.log(author);
    const [role, setRole] = useState("MEMBER");
    const [avatar, setAvatar] = useState("https://www.dropbox.com/s/wm9xcmn2z82yydi/avatar.png?raw=1");
    const [userName, setUserName] = useState("");
    const [time, setTime] = useState(0);

    const timeHandle = () =>{
        let d = new Date();
            setTime(d.getTime() - parseInt(timestamp));
        let interval = setInterval(() =>{
            let d = new Date();
            setTime(d.getTime() - parseInt(timestamp));
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }

    const isAuthor = () =>{
        if(isLoggedIn()){
            let user = JSON.parse(getData("user"));
            if(user.account === author) return true;
        }
        return false;
    }

    useEffect(() =>{
        if(timestamp){
            timeHandle();
        }
    }, [timestamp]);

    
    useEffect(() =>{
        if(author){
            
        getAuthorInfo();
        }
    },[author])

    const getAuthorInfo = async () =>{
        let user = await sendAuthGetRequest("/user/basic/" + author);
        //console.log(user);
        setRole(user.data.role);
        setAvatar(user.data.avatar);
        setUserName(user.data.userName);
    }

    return (
        <div className={style.postTitle}>
            <img src={avatar} alt="" />
            <div>
                {inActive? <div>{userName}</div>: <Link to={isAuthor()? "/account":`/user/${author}`}><div>{userName}</div></Link>}
                <div className={role !== "ADMIN"? style.hide: ""} title="Admin">
                    <FontAwesomeIcon  title="Admin" icon={faShieldHeart} />
                </div>
            </div>
            <div>{miliSecToTime(time)}</div>
        </div>
    );
}

export default PostTitle;