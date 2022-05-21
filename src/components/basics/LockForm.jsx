import { useEffect, useRef, useState } from "react"
import { errorNotify } from "../../util/notification";
import style from "./basic.module.css"

const LockForm = ({showing = false, setShowing, func}) =>{
    const [msg, setMsg] = useState("");
    const [chosen, setChosen] = useState(-1);

    const input = useRef(0);

    const message = [
        "Vi phạm pháp luật",
        "Vi phạm nội quy của fandom",
        "Ngôn ngữ gây kích động, xúc phạm",
        "Trái với thuần phong mỹ tục",
        "Sai sự thật",
    ]

    const msgClick = i =>{
        input.current.value = "";
        setChosen(i);
        setMsg(message[i]);
    }

    const validate = () =>{
        if(msg.length === 0){
            errorNotify("Phải chọn một lý do để thực hiện hành động này");
            return false;
        }
        return true;
    }

    const submit = () =>{
       if(validate()){
            func(msg);
            setShowing(false);
       }
        
    }

    return(
        <div className={showing? style.postForm: style.hide}>
            <div>
                <div>
                    Chọn nội dung vi phạm
                </div>
                <div>
                    {message.map((m, i) =>{
                        return <div className={style.msgElement + " " + (chosen === i? style.msgChoosen: "")}  onClick={e => msgClick(i)} key={"msg_element_"+i}>{m}</div>
                    })}
                    <div>
                        <div>Lý do khác</div>
                        <input ref={input} onChange={e => {setMsg(e.target.value); setChosen(-1)}} type={"text"} placeholder="Nhập lý do"/>
                    </div>
                </div>
                <div>
                    <button onClick={e => submit()}>Xác nhận</button>
                    <button onClick={e => {setMsg(""); setChosen(-1); setShowing(false)}}>Huỷ</button>
                </div>
            </div>
        </div>
    )
}

export default LockForm;