
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { errorNotify, successNotify } from "../../util/notification";
import { sendAuthPostResquest } from "../../util/utils";
import TextEditor from "../editor/TextEditor";
import style from "./schedule.module.css";

const EditSchedule = ({showing = true, setShowing, data, reload}) =>{
    //console.log(data);
    let d = new Date(data.timestamp);
    let initTime = d.getFullYear()+"-"+(d.getMonth()+1 < 10? "0" +(d.getMonth()+1): d.getMonth()+1) +"-"+(d.getUTCDate() < 10? "0"+d.getUTCDate(): d.getUTCDate())+"T"+(d.getHours() < 10? "0"+d.getHours(): d.getHours() )+":"+(d.getMinutes() < 10? "0"+d.getMinutes(): d.getMinutes());

    const [content, setContent] = useState(data.content);
    const [time, setTime] = useState(initTime);
    const [location, setLocation] = useState(data.location);
    const [clear, setClear] = useState(false);

    const close = () =>{
        setClear(true);
        setShowing(false);
    }

    const create = async () =>{
        if(!validate) return;
        let formData = new FormData();
        formData.append("id", data.id);
        formData.append("timestamp", (new Date(time).getTime()));
        formData.append("location", location);
        formData.append("content", content);
        let res = await sendAuthPostResquest("/schedule/update", formData, "");
        if(res.status === 200){
            close();
            successNotify("Chỉnh sửa lịch trình thành công");
        }else{
            errorNotify("Đã có lỗi xảy ra!!");
        }
    }

    const validate = () =>{
        let isValid = true;
        let msg = "";
        if (content === ""){
            isValid = false;
            if(msg.length === 0) msg = "Nội dung không được trống";
        }

        return isValid;
    }

    return (
        <div className={style.scheduleCreateContainer + " " + (showing? "" : style.hide)}>
            <div className={style.scheduleCreate}>
                <div>Thêm một lịch trình của nghệ sĩ</div>
                <div>
                    <div>
                        <div>Thời gian</div>
                        <input type={"datetime-local"} value= {time} onChange={e => setTime(e.target.value)} />
                    </div>
                    <div>
                        <div>Địa điểm</div>
                        <input type={"text"} value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <div>Nội dung</div>
                        <TextEditor type={"edit"} func={setContent} data={content} isClear={clear} setIsClear={setClear}/>
                    </div>
                </div>
                <div>
                    <button onClick={create}>
                        <FontAwesomeIcon icon={faCheck}/>
                        <div>Lưu</div>
                    </button>
                    <button onClick={close}>
                        <FontAwesomeIcon icon={faXmark}/>
                        <div>Huỷ</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditSchedule;