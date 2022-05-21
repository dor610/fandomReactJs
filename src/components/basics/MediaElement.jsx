import { useState } from "react";
import style from "./basic.module.css";

const MediaElement = ({src, description, type, isViewed = false}) =>{

    const [view, setView] = useState(false);

    const clickHandle = () =>{
        setView(!view);
    }

    if(type === "IMAGE") return (
        <div className={style.mediaElement} onClick={clickHandle}>
            <div className={view? style.showMedia : style.hide}>
                <img src={src.url} alt=""></img>
                <div>{description}</div>
            </div>
            <img src={src.url} alt=""></img>
        </div>
    )

    if(type === "VIDEO") return (
        <div className={style.mediaElement}  onClick={clickHandle}>
            <div className={view? style.showMedia : style.hide}>
                <video autoPlay controls muted>
                        <source src={src.url} />
                </video>
                <div>{description}</div>
            </div>
            <video autoPlay controls muted>
                    <source src={src.url} />
            </video>
        </div>
    )
}

export default MediaElement;