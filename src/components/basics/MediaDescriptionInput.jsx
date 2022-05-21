import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import style from "./basic.module.css";


const MediaDescriptionInput = ({id, type, func, file, deleteFunc, value = "", url = ""}) =>{
    /**/
    const [des, setDes] = useState(value);
    const onchange = (e) =>{
        let value = e.target.value;
        func(file.name, value);
        setDes(value);
    }

    const deleteMedia = () =>{
        if(type === "IMAGE"){
            deleteFunc(id);
        }
        if(type === "VIDEO"){
            deleteFunc();
        }
    }
if(type === "IMAGE"){
    return(
        <div className={style.mediaDescription}>
            <div>
                <img src={url !== ""? url: URL.createObjectURL(file)} alt="" />
                <input type={"text"} value={des}  onChange={onchange}  placeholder={"Nhập mô tả cho ảnh"}/>
            </div>
            <div title={"Xoá"} onClick={deleteMedia}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    )
   }

   if(type === "VIDEO"){
    return(
        <div className={style.mediaDescription}>
            <div>
                <video controls>
                    <source src={url!== ""? url: URL.createObjectURL(file)} />
                </video>
                <input type={"text"} value={des}  onChange={onchange}  placeholder={"Nhập mô tả cho video"}/>
            </div>
            <div  title={"Xoá"} onClick={deleteMedia}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </div>
    )
   }
}

export default MediaDescriptionInput;