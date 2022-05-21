import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendAuthGetRequest } from "../../util/utils";
import style from "./friendlist.module.css";
const FriendlistRow = ({account}) =>{

    const [name, setName] = useState("Người dùng");
    const [avatar, setAvatar] = useState("https://www.dropbox.com/s/wm9xcmn2z82yydi/avatar.png?raw=1");

    useEffect(() =>{
        loadData();
    }, []);

    const loadData = async () =>{
        let res = await sendAuthGetRequest(`/user/basic/${account}`);
        console.log(res);
        if(res.status === 200){
            setName(res.data.userName);
            setAvatar(res.data.avatar);
        }
    }

    return (
        <div className={style.row}>
            <Link to={`/message/${account}`}>
                <div>
                    <img src={avatar} alt=""/>
                </div>
                <div>{name}</div>
            </Link>
        </div>
    );
}

export default FriendlistRow;