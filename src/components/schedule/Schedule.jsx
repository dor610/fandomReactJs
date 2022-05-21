import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { getData, isLoggedIn } from "../../util/localStorage";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../util/requestState";
import { sendGetRequest } from "../../util/utils";
import LoadingAnimation from "../LoadingAnimation";
import { PROFILE } from "../path";
import CreateSchedule from "./CreateSchedule";
import EditSchedule from "./EditSchedule";
import style from "./schedule.module.css";
import ScheduleList from "./ScheduleList";
import ScheduleRow from "./scheduleRow";
import { setCurrPath } from "../../features/pathSlice";

const Schedule = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    const [showCreateTab, setShowCreateTab] = useState(false);

    const [type, setType] = useState("upcoming");

    const [user, setUser] = useState(undefined);

    useEffect(() =>{
        dispatch(setCurrentPage(PROFILE));
        dispatch(setCurrPath(location.pathname));
        if(isLoggedIn()) setUser(JSON.parse(getData("user")));
    }, []);

    const back = () =>{
        navigate(prevPath);
    }
//
    return (
        <div className={style.container}>
            <div>
                <div>
                    Lịch trình của nghệ sĩ
                </div>
                {user? user.role === "ADMIN"? <button onClick={e => setShowCreateTab(true)} title="Thêm lịch trình">
                    <FontAwesomeIcon title="Thêm lịch trình" icon={faPlus} />
                </button>: <div></div>:<div></div>}
                <button onClick={back} title="Trở lại">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
            </div>
            <div className={style.scheduleNavBar}>
                <button onClick={e => setType("upcoming")} className={type==="upcoming"? style.activeSchedulePage: ""}>Sắp diễn ra</button>
                <button onClick={e => setType("finished")} className={type==="finished"? style.activeSchedulePage: ""}>Đã diễn ra</button>
            </div>
            <div className={type === "upcoming"? "": style.hide}>
                <ScheduleList type={"upcoming"} />
            </div>
            <div className={type === "finished"? "": style.hide}>
                <ScheduleList type={"finished"} />
            </div>
            <CreateSchedule showing={showCreateTab} setShowing={setShowCreateTab}/>
            
        </div>
    )
}


export default Schedule;