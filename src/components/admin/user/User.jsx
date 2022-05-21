import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { miliSecToDateOnly, sendAuthGetRequest } from "../../../util/utils"
import style from "./user.module.css";

const User = ({user, type="active"}) =>{
    
    const [time, setTime] = useState(0);
    const [log, setLog] = useState({});
    useEffect(() =>{
        if(type === "active") setTime(user.createdDate);
        else{
            loadLog();
        }
    }, []);

    const loadLog = async () =>{
        let res = await sendAuthGetRequest(`/user/log/get/banned/${user.account}`);
        console.log(res);
        if(res.status === 200){
            setTime(res.data.timestamp);
            setLog(res.data);
        }
    }

    return (
        <div className={style.user}>
            <div>
                <img src={user.avatar} alt="" />
                <Link to={`/user/${user.account}`}>                          
                    <div>{user.userName}</div>
                    <div>{user.account}</div> 
                </Link>
                <div>
                    <div>Ngày tham gia: </div>
                    <div>{miliSecToDateOnly(parseInt(user.createdDate))}</div>
                </div>
            </div>
            {type === "banned"? <div>
                <div></div>
                <div>Lý do:</div>
                <div>{log.note}</div>
            </div>: <></>}
        </div>
    )
}

export default User;