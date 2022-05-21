import style from "./post.module.css";
import { miliSecToDate } from "../../../util/utils";
import { useEffect, useState } from "react";

const PostHistoryElement = ({history}) =>{

    const [status, setStatus] = useState("");
    const [statusClass, setStatusClass] = useState(style.postCreated);

    useEffect(() =>{
        switch(history.state){
            case "CREATED": setStatus("Tạo mới");
                setStatusClass(style.postCreated);
                break;
            case "PENDING": setStatus("Chờ duyệt");
                setStatusClass(style.postPeding);
                break;
            case "APPROVED": setStatus("Đã được duyệt");
                setStatusClass(style.postApproved);
                break;
            case "LOCKED": setStatus("Bị khoá");
                setStatusClass(style.postLocked);
                break;
            case "DELETED": setStatus("Bị xoá");   
                setStatusClass(style.postDeleted);
                break;
            default: break;    
        }
    }, []);

    return (
        <div className={style.historyElement}>
            <div>
                <div>Thời gian: {miliSecToDate(history.timestamp)}</div>
                <div>Trạng thái: <span className={statusClass}>{status}</span></div>
            </div>
            <div>Ghi chú: {history.note}</div>
        </div>
    )
}

export default PostHistoryElement;