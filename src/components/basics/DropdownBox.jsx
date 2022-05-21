import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import style from "./basic.module.css";

const DropdownBox = ({data = [], func, defaultIndex = 0}) =>{

    const [label, setLabel] = useState(data[defaultIndex]);
    const [isOpen, setIsOpen] = useState(false);

    const dropdown = () =>{
        setIsOpen(!isOpen);
    }

    const optionClick = option =>{
        setLabel(option);
        func(option);
        setIsOpen(!isOpen);
    }

    return (
        <div className={style.comboBox}>
            <div onClick={dropdown}><span>{label}</span>
                <span><FontAwesomeIcon icon={isOpen? faAngleUp: faAngleDown} /></span>
            </div>
            <div className={style.comboBoxContainer + " " + (isOpen? "" : style.hide)}>
                {data.map((d, i) =>{
                   return <div onClick={() => optionClick(d)} className={style.comboBoxOption + " " + (label === d? style.comboBoxChosenOption: "")} key={d+i}>{d}</div>
                })}
            </div>
        </div>
    )
}

export default DropdownBox;