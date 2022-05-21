import notFoundAnimation from "../json/notFound.json";
import accessDeniedAnimation from "../json/accessDenied.json";
import Lottie from "lottie-react";
import style from "../css/errorPage.module.css"; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = ({type}) =>{

    const render = () =>{
        if(type === "notFound")
            return (
                <div className={style.animation}>
                    <Lottie animationData={notFoundAnimation} />
                    <div>Có gì đó sai sai :(</div>
                </div>
            )
        if(type === "accessDenied")
            return (
                <div className={style.animation}>
                    <Lottie animationData={accessDeniedAnimation} />
                    <div>Có vẻ như bạn bị lạc?</div>
                </div>
            )
    }

    return(
        <div className={style.container}>
            {render()}
            <div className={style.navBar}>
                <Link to={"/"}>
                    <FontAwesomeIcon icon={faHouse} />
                    <div>Trang chủ</div>
                </Link>
            </div>
        </div>
    )
}


export default ErrorPage;