import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { errorNotify, successNotify } from "../../util/notification";
import { sendAuthPostResquest } from "../../util/utils";
import TextEditor from "../editor/TextEditor";
import style from "./schedule.module.css";

const CreateSchedule = ({showing = true, setShowing}) =>{

    let d = new Date();
    let initTime = d.getFullYear()+"-"+(d.getMonth()+1 < 10? "0" +(d.getMonth()+1): d.getMonth()+1) +"-"+(d.getUTCDate() < 10? "0"+d.getUTCDate(): d.getUTCDate())+"T"+(d.getHours() < 10? "0"+d.getHours(): d.getHours() )+":"+(d.getMinutes() < 10? "0"+d.getMinutes(): d.getMinutes());


    const [content, setContent] = useState("");
    const [time, setTime] = useState(initTime);
    const [location, setLocation] = useState("");
    const [clear, setClear] = useState(false);

    const close = () =>{
        setClear(true);
        setShowing(false);
    }

    const create = async () =>{
        if(!validate) return;
        let data = new FormData();
        data.append("timestamp", (new Date(time).getTime()));
        data.append("location", location);
        data.append("content", content);
        let res = await sendAuthPostResquest("/schedule/create", data, "");
        if(res.status === 200){
            close();
            successNotify("Thêm lịch trình thành công");
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
                        <TextEditor type={"create"} func={setContent} isClear={clear} setIsClear={setClear}/>
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

export default CreateSchedule;