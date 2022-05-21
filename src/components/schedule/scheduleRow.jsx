import { faPen, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getData, isLoggedIn } from "../../util/localStorage";
import { miliSecToDate, sendAuthPostResquest } from "../../util/utils";
import DeleteForm from "../basics/DeleteForm";
import TextEditor from "../editor/TextEditor";
import EditSchedule from "./EditSchedule";
import style from "./schedule.module.css";

const ScheduleRow = ({data = null, min = false, onDelete, role = "MEMBER"}) =>{

    const [scheduleState, setScheduleState] = useState(true);
    let time = miliSecToDate(parseInt(data.timestamp));
    const [showingDeleteForm, setShowingDeleteForm] = useState(false);
    const [showEditTab, setShowEditTab] = useState(false);
    let user = undefined;

    useEffect(() =>{
        let d = new Date();
        if(d.getTime() < parseInt(data.timestamp)){
            setScheduleState(true);
        }else{
            setScheduleState(false);
        }
    }, []);

    const deleteSchedule = async () =>{
        let formData = new FormData();
        formData.append("id", data.id);
        let res = await sendAuthPostResquest("/schedule/delete", formData, "");
        if(res.status === 200){
            onDelete(data.id);
        }
    }


    if(min){
        return (
            <>
            {data? <div title={scheduleState? "Sự kiện sắp diễn ra": "Sự kiện đã diễn ra"} className={style.scheduleRowMin}>
                <div className={scheduleState? style.upcomingMin: style.finishedMin}></div>
                <div>Thời gian: {time}</div>
                <TextEditor data={data.content} type="display" />
            </div>: <></>}
            </>
        )
    }

    /*
            <DeleteForm showing={showingDeleteForm} type="schedule" closeFunc={setShowingDeleteForm} deleteFunc={deleteSchedule}/>*/
    return (
        <>
        {data? <div className={style.scheduleRow}>
            <div>
                <div>
                    <div>Thời gian: {time}</div>
                    <div>Trạng thái: <span className={scheduleState? style.upcoming: style.finished}>{scheduleState? "Sắp diễn ra": "Đã diễn ra"}</span></div>
                </div>
                <div>
                    <TextEditor data={data.content} type="display" />
                </div>
                <div>Địa điểm: {data.location}</div>
            </div>
            <div>
                {role === "ADMIN"? <>
                <button onClick={e => setShowEditTab(true)} title="Chỉnh sửa">
                    <FontAwesomeIcon title="Chỉnh sửa" icon={faPen} />
                </button>
                <button onClick={e => setShowingDeleteForm(true)} title="Xoá">
                    <FontAwesomeIcon title="Xoá" icon={faX} />
                </button>
                </>:<div></div>}
            </div>
            
            <EditSchedule showing={showEditTab} setShowing={setShowEditTab} data={data} />
            </div>: <></>}
        </>
    )
}

export default ScheduleRow;