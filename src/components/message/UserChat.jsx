import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChatContent from "./ChatContent";
import ChatHeader from "./chatHeader";
import ChatInput from "./ChatInput";
import style from "./message.module.css";
import { addMessageCurrentMessageList, setMessageCurrentChatId, setMessageCurrentMessageList, setMessageCurrentUser } from "../../features/messageSlice";
import { generateChatId, sendAuthGetRequest } from "../../util/utils";
import { getData, isLoggedIn } from "../../util/localStorage";
import { setUser } from "../../features/userSlice";
import LoadingAnimation from "../LoadingAnimation";
import { Idle, Pending, Succeed } from "../../util/requestState";
import { setCurrPath } from "../../features/pathSlice";

const UserChat = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {account} = useParams("user");

    const [user, setUser] = useState({});
    const [page, setPage] = useState(1);
    const [isLoad, setIsLoad] = useState(false);
    const [status, setStatus] = useState(Idle);

    const accountName = useSelector(state => state.message.current.name)
    const chatId = useSelector(state => state.message.current.chatId);
    const list = useSelector(state => state.message.current.messageList);

    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    useEffect(() => {
        
        dispatch(setCurrPath(location.pathname));
        if(isLoggedIn()){
            setUser(JSON.parse(getData("user")));
        }else{
            navigate("/login"); 
        }
    }, [])

    useEffect(() =>{
       if(account){
           console.log(account);
        if(Object.keys(user).length > 0){
            let ci = generateChatId(user.account, account);
            dispatch(setMessageCurrentChatId(ci));
            firstLoad(ci);
        }
       }
    }, [account, user, chatId]);

    useEffect(() =>{
        if(isLoad){
            loadData();
        }
    })

    useEffect(() =>{
        dispatch(setMessageCurrentUser(account));
    })

    const firstLoad = async( ci ) =>{
        setStatus(Pending);
        console.log(ci);
        let res = await sendAuthGetRequest(`/message/${user.account}/messages/${ci}/0`);
        //console.log(res);
        if(res.status === 200){
            dispatch(setMessageCurrentMessageList(res.data));
            setStatus(Succeed);
        }
    }

    const loadData = async() =>{
        setStatus(Pending);
        setIsLoad(false);
        let res = await sendAuthGetRequest(`/message/${user.account}/messages/${chatId}/${page}`);
        if(res.status === 200){
            dispatch(addMessageCurrentMessageList(res.data));
            setStatus(Succeed);
            setPage(page + 1);
        }
    }
    
    const scroll = (e) =>{
        if(e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight < 1) setIsLoad(true);
    }

    return (
        <div className={style.userChat}>
            <ChatHeader />
            <div onScroll={scroll}>
                {Object.keys(list).length === 0? <div>Gửi lời chào đến {accountName} </div>: <div className={style.hide}></div>}
                {Object.keys(list).map((key, i) =>{
                    return <ChatContent data={list[key]} sender={user.account} key={list[key].id}/>
                })}
                <LoadingAnimation showing={status === Pending} msg="Đang tải" />
            </div>
            <ChatInput />

        </div>
    )
}

export default UserChat;