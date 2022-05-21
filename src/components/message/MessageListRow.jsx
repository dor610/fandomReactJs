import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../util/localStorage";
import { generateChatId, sendAuthGetRequest } from "../../util/utils";
import style from "./message.module.css";
import MessageListRowHeader from "./MessageListRowHeader";
import TextEditor from "../editor/TextEditor";

const MessageListRow = ({account}) =>{

    let user = JSON.parse(getData("user"))
    let chatId = generateChatId(user.account, account);
    let [message, setMessage] = useState({});

    useEffect(() =>{
        loadMessage();
    })

    const loadMessage = async () =>{
        let res = await sendAuthGetRequest(`/message/${user.account}/last/${chatId}`);
        if(res.status === 200){
            setMessage(res.data);
        }
    }


    return (
        <div className={style.messageListRow}>
            <MessageListRowHeader account={account} message={message}/>
            <Link to={`/message/${account}`} >
                {Object.keys(message).length >0? <TextEditor type={"display"} data={message.message} />:
                <div>Tin nhắn</div>}
            </Link>
        </div>
    )
}

export default MessageListRow;