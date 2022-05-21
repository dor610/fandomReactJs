import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriend } from "../../features/messageSlice";
import { getData, isLoggedIn } from "../../util/localStorage";
import { sendAuthGetRequest } from "../../util/utils";
import style from "./friendlist.module.css";
import FriendlistRow from "./FriendListRow";

const FriendList = () =>{

    const dispatch = useDispatch();
    const list = useSelector(state => state.message.friend);
    useEffect(() =>{
        if(isLoggedIn()){
            firstLoad();
        }
    },[])

    const firstLoad = async () =>{
        let res = await sendAuthGetRequest(`/user/message/${JSON.parse(getData("user")).account}/recentChat`);
        if(res.status === 200){
            dispatch(setFriend(res.data));
        }
    } 


    return (
        // dựa theo danh sách generate 10 row
        <>
            {isLoggedIn() || list.length === 0? <div className={style.container}>
            <div>Nhắn tin gần đây</div>
            <div className={style.friendList}>
                {list.length > 0?
                    list.map((f, i) =>{
                        return <FriendlistRow account={f} key={"f_l_r_"+i}/>
                    }): <></>
                }
            </div>
        </div>: <></>}
        </>
    );
}

export default FriendList;
