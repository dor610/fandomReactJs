import Lottie from "lottie-react";
import animation from "../json/loading.json";
import style from "../css/loadingAnimation.module.css";

export const LoadingAnimation = ({showing = false, msg = "", func = undefined, type = "v"}) =>{

    const cancel = () =>{
        func();
    }

    return(
        <div className={(type==="v"? style.loading: style.hLoading) + " " + (showing? style.show : style.hide)}>
            <Lottie animationData={animation} loop={true}></Lottie>
            <div>{msg? msg: ""}</div>
            {func !== undefined? <button onClick={cancel}>Huỷ</button>: <></>}
        </div>
    )
}

export default LoadingAnimation;