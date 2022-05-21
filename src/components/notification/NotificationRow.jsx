import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../features/notificationSlice";
import { miliSecToTime, sendAuthPostResquest } from "../../util/utils";
import ConfirmBox from "../basics/ConfirmBox";
import style from "./notification.module.css";

const NotificationRow = ({data}) =>{

    const dispatch = useDispatch();

    const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false);
    const [isRemove, setIsRemove] = useState(false);

    const processHeaderClass = () =>{
        switch(data.type){
            case "GOOD": return style.good;
            case "BAD": return style.bad;
            default: return style.warning;        
        }
    }

    useEffect(() =>{
        if(isRemove){
            remove();
        }
    })

    const onRemove = () =>{
        setIsOpenConfirmBox(true);
    }

    const remove = async () =>{
        let res = await sendAuthPostResquest(`/notification/delete/${data.id}`, "", "");
        if(res.status === 200){
            dispatch(deleteNotification(data.id));
        }
    }

    return (
        <div className={style.notificationRow}>
            <div className={processHeaderClass()}></div>
            <div>
                <div>{data.note}</div>
                <div>{miliSecToTime(parseInt((new Date()).getTime() - data.timestamp))}</div>
            </div>
            <div>
                {data.message}
            </div>
            <div onClick={onRemove} title="Xoá">
                <FontAwesomeIcon title="Xoá" icon={faXmarkCircle} />
            </div>
            <ConfirmBox isOpen={isOpenConfirmBox} msg="Bạn có chắc muốn xoá?" onClose={setIsOpenConfirmBox} onConfirm={setIsRemove}/>

        </div>    
    )
}

export default NotificationRow;