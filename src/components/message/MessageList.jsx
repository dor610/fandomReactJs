import { useDispatch, useSelector } from "react-redux";
import style from "./message.module.css";
import MessageListRow from "./MessageListRow";
import { sendAuthGetRequest } from "../../util/utils";
import { useEffect, useState } from "react";
import { getData } from "../../util/localStorage";
import { setFriend } from "../../features/messageSlice";

const MessageList = () =>{

    const dispatch = useDispatch();

    const list = useSelector(state => state.message.friend);

    const [user, setUser] = useState(JSON.parse(getData("user")));


    useEffect(() =>{
        firstLoad();
    }, [])

    const firstLoad = async () =>{
        let res = await sendAuthGetRequest(`/user/message/${user.account}/recentChat`);
        if(res.status === 200){
            dispatch(setFriend(res.data));
        }
    } 

    return (
        <div className={style.messageList}>
            <div>
                Nhắn tin gần đây
            </div>
            <div>
                <div>
                    <div className={list.length > 0 ? style.hide: ""}>Có vẻ bạn chưa trò chuyện với ai cả.</div>
                    {list.length > 0? 
                        list.map((f, i) =>{
                            return <MessageListRow account={f} key={"friend_m_" + i}/>
                        }):<></>}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}


export default MessageList;