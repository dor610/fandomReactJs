import style from "./profile.module.css";
import TextEditor from "../editor/TextEditor";
import { useSelector } from "react-redux";

const LifeAndCareer = () =>{

    const data = useSelector(state => state.profile.profile.lifeAndCareers);

    return (
        <div className={style.lifeAndCareer}>
            <TextEditor type="display" data={data}/>
        </div>
    )
}

export default LifeAndCareer;