import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { processMessageTime, sendGetRequest } from "../../util/utils";

const MessageListRowHeader = ({account, message}) =>{

    const [useName, setUserName] = useState("Người dùng");
    const [avatar, setAvatar] = useState("https://www.dropbox.com/s/wm9xcmn2z82yydi/avatar.png?raw=1");
    const dispatch = useDispatch();

    useEffect(() =>{
        loadUserData();
    }, []);

    const loadUserData = async () =>{
        let res = await sendGetRequest(`/user/basic/${account}`)
        console.log(res);
        if(res.status === 200){
            setUserName(res.data.userName);
            setAvatar(res.data.avatar);
        }
    }

    return (
        <div>
            <img src={avatar} alt="" />
            <div>
                <Link to="">
                    {useName}
                </Link>
                <div>{Object.keys(message).length > 0? processMessageTime(parseInt(message.timestamp)): "0 giây trước"}</div>
            </div>
        </div>
    )
}

export default MessageListRowHeader;