import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrPath } from "../../features/pathSlice";
import { setCurrentPage } from "../../features/variable/variableSlice";
import  style from "./notification.module.css";
import { NOTIFICATION } from "../path";
import { sendAuthGetRequest } from "../../util/utils";
import { getData, isLoggedIn } from "../../util/localStorage";
import { warningNotify } from "../../util/notification";
import { addNotification, setNotification, setNotificationPage } from "../../features/notificationSlice";
import LoadingAnimation from "../LoadingAnimation";
import NotificationRow from "./NotificationRow";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../util/requestState";

const Notification = ({msg, type}) =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const list = useSelector(state => state.notification.list);
    const page = useSelector(state => state.notification.page);
    const [status, setStatus] = useState(Idle);
    const user = JSON.parse(getData("user"));
    const prevPath = useSelector(state => state.path.prevPath);

    useEffect(() =>{
        dispatch(setCurrPath(location.pathname));
        dispatch(setCurrentPage(NOTIFICATION));
        if(!isLoggedIn()){
            warningNotify("Bạn không có quyền truy cập vào nơi này...", "accessDenied");
            navigate("/login");
        }else{
            firstLoad();
        }
    }, []);
    

    const firstLoad = async () =>{
        setStatus(Pending);
        let res = await sendAuthGetRequest(`/notification/get/${user.account}/0`);
        console.log(res);
        if(res.status === 200){
           if(Object.keys(res.data).length === 15){
            dispatch(setNotification(res.data));
            dispatch(setNotificationPage(1));
            setStatus(Succeed);
           }else{
               dispatch(setNotification(res.data));
               dispatch(setNotificationPage(1));
               setStatus(NoContent);
           }
        }else{
            setStatus(Failed);
        }
    }

    const loadData = async () =>{
        setStatus(Pending);
        let res = await sendAuthGetRequest(`/notification/get/${user.account}/${page}`);
        if(res.status === 200){
           if(Object.keys(res.data).length === 15){
            dispatch(addNotification(res.data));
            dispatch(setNotificationPage(page + 1));
            setStatus(Succeed);
           }else{
                dispatch(addNotification(res.data));
                dispatch(setNotificationPage(1));
               setStatus(NoContent);
           }
        }else{
            setStatus(Failed);
        }
    }

    return (
        <div className={style.notification}>
            <div>Thông báo</div>
            <div>
                {Object.keys(list).map((n, i) =>{
                    console.log(list[n]);
                    return <NotificationRow data={list[n]} key={"noti_"+i}/>
                })}
            </div>
            <div onClick={loadData} className={status === NoContent? style.hide: ""}>Xem thêm</div>
            <LoadingAnimation showing={status === Pending} msg="Đang tải"/>
        </div>

    )
}

export default Notification;