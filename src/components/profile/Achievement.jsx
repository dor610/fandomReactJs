import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../editor/TextEditor";
import style from  "./profile.module.css";

const  Achivement = () =>{

    const dispatch = useDispatch();

    const data = useSelector(state => state.profile.profile.achievements);
    const [content, setContent] = useState(data);

    return (
        <div className={style.achievements}>
            <TextEditor type="display" data={data}/>
        </div>
    )
}

export default Achivement;