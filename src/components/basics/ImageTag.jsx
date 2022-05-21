import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./basic.module.css";

const ImageTag = ({file, id, deleteFunc}) =>{

    const deleteImg = () =>{
        deleteFunc(id);
    }

    return (
        <div className={style.imgTag}>
            <div>
                <img src={URL.createObjectURL(file)} alt=""  id="comment-create-image"/>
            </div>
            <FontAwesomeIcon onClick={deleteImg} icon={faDeleteLeft}/>
        </div>
    )
}

export default ImageTag;