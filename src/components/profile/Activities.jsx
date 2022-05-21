import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../editor/TextEditor"
import style from "./profile.module.css"

const Activities = () =>{

    const dispatch = useDispatch();

    const data = useSelector(state => state.profile.profile.activities);
    const [content, setContent] = useState(data);

    return(
        <div className={style.activities}>
            <TextEditor type="display" data={data}/>
        </div>
    )
}

export default Activities;