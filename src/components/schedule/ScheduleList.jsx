import { useEffect, useState } from "react";
import { getData, isLoggedIn } from "../../util/localStorage";
import { getFullDate, sendGetRequest } from "../../util/utils";
import DropdownBox from "../basics/DropdownBox";
import style from "./schedule.module.css";
import ScheduleRow from "./scheduleRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import LoadingAnimation from "../LoadingAnimation";
import { Idle, NoContent, Failed, Pending, Succeed } from "../../util/requestState";

const sort = (schedules, sortOption, type) =>{
    let list = Object.keys(schedules);
    let data = {};
    let t = 0;
    if(sortOption === "Gần nhất" && type === "upcoming" || sortOption === "Xa nhất" && type === "finished") t = 0;
    if(sortOption === "Xa nhất" && type === "upcoming" || sortOption === "Gần nhất" && type === "finished") t =1;
    if(t === 1){
        let index = 0;
        for(let i = 0; i < list.length; i++){
            index = i;
            let j = i + 1;
            while(j < list.length){
                if(schedules[list[index]].timestamp < schedules[list[j]].timestamp){
                    index = j;
                }
                j++;
            }
            
            data[schedules[list[index]].id] = schedules[list[index]];
            let temp = list[i];
            list[i] = list[index];
            list[index] = temp;
        }
        return data;
    }else{
        let index = 0;
        for(let i = 0; i < list.length; i++){
            index = i;
            let j = i + 1;
            while(j < list.length){
                if(schedules[list[index]].timestamp > schedules[list[j]].timestamp){
                    index = j;
                }
                j++;
            }
            data[schedules[list[index]].id] = schedules[list[index]];
            let temp = list[i];
            list[i] = list[index];
            list[index] = temp;
        }
        return data;
    }
}

const debounceFill = debounce((type, endDate, startDate,setSchedules) =>{
    fill(type, endDate, startDate, setSchedules);
}, 500);

const fill = async (type, endDate, startDate, setSchedules) =>{
        if(type === "upcoming"){
            if(endDate){
                let start = (new Date(startDate).getTime());
                let end = (new Date(endDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/filter/${start}/${end}/${0}`);
                if(res.status === 200){
                    setSchedules(res.data); 
                }
            }else{
                let start = (new Date(startDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/after/${start}/${0}`);
                console.log("upcoming: ")
                console.log(res);
                if(res.status === 200){
                    setSchedules(res.data);
                }
            }
        }else{
            if(startDate){
                let start = (new Date(startDate).getTime());
                let end = (new Date(endDate)).getTime();
                
                let res = await sendGetRequest(`/schedule/get/filter/${start}/${end}/${0}`);
                console.log(res);
                if(res.status === 200){
                    setSchedules(res.data);
                }
            }else{
                let end =(new Date(endDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/before/${end}/${0}`);
                console.log("finished: ")
                console.log(res);
                if(res.status === 200){
                    setSchedules(res.data);
                }   
            }
        }
}


const ScheduleList = ({type}) =>{

    let currentDate = getFullDate(new Date());

    const [page, setPage] = useState(0);
    const [filterPage, setFilterPage] = useState(0);
    const [schedules, setSchedules] = useState({});
    const [scheduleList, setScheduleList] = useState({});
    const [sortOption, setSortOption] = useState("Gần nhất");
    const [isFilter, setIsFilter] = useState(false);
    const [status, setStatus] = useState(Idle);
    const [startDate, setStartDate] = useState(() => {
        if(type === "upcoming") return currentDate;
        else return "";
    });
    const [endDate, setEndDate] = useState(() =>{
        if(type === "finished") return currentDate
        return "";
    });

    const [user, setUser] = useState(undefined);


    useEffect(() =>{
        if(type === "upcoming"){
            setEndDate("");
        }else{
            setStartDate("");
        }
        if(isLoggedIn()) setUser(JSON.parse(getData("user")));
        loadSchedule();
    }, []);

    useEffect(() =>{
        let ob = sort(schedules, sortOption, type);
        setScheduleList(ob);
    }, [schedules, sortOption]);


    useEffect(() =>{
        if(isFilter){
            debounceFill(type, endDate, startDate, setSchedules, setIsFilter)
        }
    }, [isFilter, type, endDate, startDate])

    const loadSchedule = async (p = undefined) =>{
        setStatus(Pending);
        let pa = p === undefined? page: p;
        if(type === "upcoming"){
            let res = await sendGetRequest(`/schedule/get/upcoming/${pa}`);
            if(res.status === 200){
                setStatus(Succeed);
                if(pa === 0) setSchedules(res.data);
                else setSchedules({...schedules, ...res.data});
                if(Object.keys(res.data).length < 10) setStatus(NoContent)
                setPage(page + 1);
            }else{
                setStatus(Failed);
            }
        }else{
            let res = await sendGetRequest(`/schedule/get/finished/${pa}`);
            if(res.status === 200){
                setStatus(Succeed);
                if(pa === 0) setSchedules(res.data);
                else setSchedules({...schedules, ...res.data});
                if(Object.keys(res.data).length < 10) setStatus(NoContent)
                setPage(page + 1);
            }else{
                setStatus(Failed);
            }
        }
    }

    const loadFilledSchedule = async () =>{
        setStatus(Pending);
        if(type === "upcoming"){
            if(endDate){
                let start = (new Date(startDate).getTime());
                let end = (new Date(endDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/filter/${start}/${end}/${0}`);
                if(res.status === 200){
                    setStatus(Succeed); setSchedules({...schedules, ...res.data});
                    if(Object.keys(res.data).length < 10) setStatus(NoContent)
                    setFilterPage(filterPage + 1);
                }else{
                    setStatus(Failed);
                }
            }else{
                let start = (new Date(startDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/after/${start}/${0}`);
                if(res.status === 200){
                    setStatus(Succeed); setSchedules({...schedules, ...res.data});
                    if(Object.keys(res.data).length < 10) setStatus(NoContent)
                    setFilterPage(filterPage + 1);
                }else{
                    setStatus(Failed);
                }
            }
        }else{
            if(startDate){
                let start = (new Date(startDate).getTime());
                let end = (new Date(endDate)).getTime();
                
                let res = await sendGetRequest(`/schedule/get/filter/${start}/${end}/${0}`);
                if(res.status === 200){
                    setStatus(Succeed); setSchedules({...schedules, ...res.data});
                    if(Object.keys(res.data).length < 10) setStatus(NoContent)
                    setFilterPage(filterPage + 1);
                }else{
                    setStatus(Failed);
                }
            }else{
                let end =(new Date(endDate)).getTime();

                let res = await sendGetRequest(`/schedule/get/before/${end}/${0}`);
                if(res.status === 200){
                    setStatus(Succeed); setSchedules({...schedules, ...res.data});
                    if(Object.keys(res.data).length < 10) setStatus(NoContent)
                    setFilterPage(filterPage + 1);
                }else{
                    setStatus(Failed);
                }  
            }
        }
    }

    const getSchedule = () =>{
        if(isFilter){
            loadFilledSchedule();
        }else{
            loadSchedule();
        }
    }

    const deleteSchedule = (id) =>{
        let list = {...schedules};
        delete list[id];
        setSchedules(list);
    }


    const reset = () =>{
        if(type === "upcoming"){
            setEndDate("");
        }else{
            setStartDate("");
        }
        setIsFilter(false);
        setFilterPage(1);
        setPage(0);
        loadSchedule(0);
    }

    if(type === "upcoming"){
        return (
            <div className={style.scheduleList}>
                <div>
                    <DropdownBox data={["Gần nhất", "Xa nhất"]} func={setSortOption}/>
                    <div>
                        <div>
                            <span>Từ ngày: </span>
                            <input value={startDate} onChange={e => {setStartDate(e.target.value); setIsFilter(true); setFilterPage(1)}} type={"date"} min={currentDate}/>
                        </div>
                        <div>
                            <span>Đến ngày: </span>
                            <input value={endDate} onChange={e => {setEndDate(e.target.value); setIsFilter(true); setFilterPage(1)}} type={"date"} min={startDate}/>
                        </div>
                    </div>
                    {isFilter? <div onClick={reset} title="Đặt lại bộ lọc" >
                        <FontAwesomeIcon title="Đặt lại bộ lọc" icon={faXmark} />
                    </div>: <div></div>}
                </div>
                {Object.keys(scheduleList).map((s, i) =>{;
                    return  <ScheduleRow role={user? user.role: "MEMBER"} data={scheduleList[s]} onDelete={deleteSchedule} key={"Schedule_"+scheduleList[s].timestamp+"_"+i}/>
                })}

                <div>
                    <LoadingAnimation showing={status === Pending} msg="Đang tải"/>
                </div>
                <div onClick={getSchedule} className={(status === Pending || status === NoContent)? style.hide: ""}>Xem thêm</div>
            </div>
        )
    }

    if(type === "finished"){
        return (
            <div className={style.scheduleList}>
                <div>
                    <DropdownBox data={["Gần nhất", "Xa nhất"]} func={setSortOption}/>
                    <div>
                        <div>
                            <span>Từ ngày: </span>
                            <input value={startDate} onChange={e => {setStartDate(e.target.value); setIsFilter(true); setFilterPage(1)}} max={endDate} type={"date"}/>
                        </div>
                        <div>
                            <span>Đến ngày: </span>
                            <input value={endDate} onChange={e => {setEndDate(e.target.value); setIsFilter(true); setFilterPage(1)}} type={"date"} max={currentDate}/>
                        </div>
                    </div>
                    {isFilter? <div onClick={reset} title="Đặt lại bộ lọc" >
                        <FontAwesomeIcon title="Đặt lại bộ lọc" icon={faXmark} />
                    </div>: <div></div>}
                </div>
                {Object.keys(scheduleList).map((s, i) =>{
                    return <ScheduleRow role={user? user.role: "MEMBER"} data={scheduleList[s]} onDelete={deleteSchedule} key={"Schedule_"+scheduleList[s].timestamp+"_"+i}/>
                })}
                <div>
                    <LoadingAnimation showing={status === Pending} msg="Đang tải"/>
                </div>
                <div onClick={getSchedule} className={(status === Pending || status === NoContent)? style.hide: ""}>Xem thêm</div>
            </div>
        )
    }

    return <div></div>
}

export default ScheduleList;