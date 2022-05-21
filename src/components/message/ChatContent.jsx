import TextEditor from "../editor/TextEditor";
import style from "./message.module.css";
import { processMessageTime } from "../../util/utils";
import { useSelector } from "react-redux";
import MediaViewer from "../basics/MediaViewer";
import MediaElement from "../basics/MediaElement";
const ChatContent = ({data, sender}) =>{

    const recipient = data.recipient;
    return (
        <div className={style.chatContent}>
            <div className={sender === recipient? style.receive: style.send}>
               {data.message === ""? <div className={style.hide}></div>: <div>
                    <TextEditor data={data.message} type="display" />
                </div>}
                {data.messageType === "IMAGE"? 
                    <MediaViewer images={data.images}  isViewed={false} arr={true} type="IMAGE" />: <></>}
                <div>{processMessageTime(parseInt(data.timestamp))}</div>
            </div>
        </div>
    )
}


export default ChatContent;