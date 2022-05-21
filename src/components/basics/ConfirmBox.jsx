import { useEffect, useState } from "react"
import { submit } from "redux-form";
import style from "./basic.module.css"

const ConfirmBox = ({isOpen,onClose, onConfirm, msg}) => {

    const close = () =>{
        onClose(false);
    }

    const confirm = () =>{
        onConfirm(true);
        close();
    }

    return (
        <div className={style.confirmBox + " " + (isOpen? "" : style.hide)}>
            <div>
                <div>{msg}</div>
                <div>
                    <button onClick={close}>Huỷ</button>
                    <button onClick={confirm}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox;