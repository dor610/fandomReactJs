import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendGetRequest } from "../../util/utils";
import style from "./schedule.module.css";
import ScheduleRow from "./scheduleRow";

const ScheduleMin = () =>{

    const navigate = useNavigate();
    const [schedules, setSchedules] = useState({});

    useEffect(() =>{
        getSchedules()
    }, []);

    const getSchedules = async () =>{
        let res = await sendGetRequest("/schedule/firstload");
        console.log(res);
        if(res.status === 200){
            setSchedules(res.data);
        }
    }

    const openDetailPage = () =>{
        navigate("/schedule");
    }
//<ScheduleRow min={true} data={data2}/>
    return (
        <div className={style.minContainer}>
            <div>Lịch trình</div>
            <div className={style.schedule}>
                {Object.keys(schedules).map((k, i) => {
                    return <ScheduleRow data={schedules[k]} key={"s_min_"+i} min={true}/>
                })}
            </div>
            <div onClick={openDetailPage}>Chi tiết</div>
        </div>
    )
}

export default ScheduleMin;