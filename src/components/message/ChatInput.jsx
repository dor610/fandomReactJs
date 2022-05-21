import { faFileImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./message.module.css";
import ImageTag from "../basics/ImageTag";
import { useEffect, useState } from "react";
import TextEditor from "../editor/TextEditor";
import { sendMessage } from "../../App";
import { useSelector } from "react-redux";
import { getData } from "../../util/localStorage";
import { sendAuthPostResquest } from "../../util/utils";
import LoadingAnimation from "../LoadingAnimation";

const ChatInput = () =>{
    

    const [content, setContent] = useState("");
    const recipient = useSelector(state => state.message.current.user);
    const chatId = useSelector(state => state.message.current.chatId);
    const sender = JSON.parse(getData("user")).account;
    const [images, setImages] = useState([]);
    const [isImageMessage, setIsImageMessage] = useState(false);
    const [isClear, setIsClear] = useState(false);
    const [status, setStatus] = useState(false);

    const send = async () =>{
        setStatus(true);
        if(isImageMessage){
            console.log("send image");
            let formData = new FormData();
            Array.from(images).forEach((image, id) =>{
                formData.append("image", image);
            });
            formData.append("message", content);
            formData.append("sender", sender);
            formData.append("recipient", recipient);
            formData.append("chatId", chatId);
            let res = await sendAuthPostResquest("/message/image", formData, "multipart/form-data");
            if(res.status === 200){
                setIsClear(true);
                setImages([]);
                setStatus(false);
            }
        }else{
            console.log("send text");
            sendMessage("/app/message", JSON.stringify({
                chatId: chatId,
                sender: sender,
                recipient: recipient,
                message: content
            }));
            setIsClear(true);
            setStatus(false);
        }
    }

    useEffect(() =>{
        if(images.length > 0){
            setIsImageMessage(true);
        }else{
            setIsImageMessage(false);
        }
    })

    const deleteImage = (id) =>{
        let list = [...images];
        list.splice(id, 1);
        setImages(list);
    }

    return (
        <div className={style.chatInput}>
            <div>
                <LoadingAnimation msg="Đang gửi" showing={status} type="h"/>
            </div>
            <TextEditor type={"create"} isClear={isClear} setIsClear={setIsClear}  size="small" func={setContent}/>
            <div>
                <div>
                    <input hidden accept="image/*" onChange={e => setImages(e.target.files)} id="chat-image-input" type={"file"} multiple />
                    <label htmlFor="chat-image-input" title="Gửi hình ảnh" >
                        <FontAwesomeIcon icon={faFileImage} />
                    </label>
                </div>
                <div>
                    {Array.from(images).map((image, id) =>{
                        return <ImageTag deleteFunc={deleteImage} id={id} file={image} key={image.name+"id"+id}/>
                    })}         
                </div>
                <button onClick={send} title="Gửi">
                    <FontAwesomeIcon title="Gửi" icon={faPaperPlane} />
                </button>
            </div>
        </div>
    )
}

export default ChatInput;