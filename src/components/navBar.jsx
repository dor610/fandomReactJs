import { Link } from "react-router-dom";
import style from "../css/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faMessage, faBell, faArrowRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ACCOUNT, ACCOUNT_EDIT, ACCOUNT_POST, ACCOUNT_PROFILE, HOME, MESSAGE, NOTI, NOTIFICATION } from "./path";
import { getData, isLoggedIn, setData } from "../util/localStorage";

const NavBar = () =>{

    const page = useSelector(state => state.variable.currentPage);
    const [loggedIn, setLoggedIn] = useState(false);
    let dispatch = useDispatch();

    useEffect(() =>{
        if(isLoggedIn()){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    })

    const openUserProfile = () =>{
    }

    return (
        <nav className={style.navBar}>
            <div className={page === HOME? style.activeBtn: ""}>
                <Link to={"/"}>
                    <div>
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div>Trang chủ</div>
                </Link>
            </div>
            {
                loggedIn? <>
                    <div className={page === ACCOUNT_PROFILE || page === ACCOUNT_EDIT || page === ACCOUNT_POST? style.activeBtn: ""}>
                <Link onClick={openUserProfile} to={"/account"}>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div>Tài khoản</div>
                </Link>
            </div>
            <div className={page === MESSAGE? style.activeBtn: ""}>
                <Link to={"/message"}>
                    <div>
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div>Tin nhắn</div>
                </Link>
            </div>
            <div className={page === NOTIFICATION? style.activeBtn: ""}>
                <Link to={"/notification"}>
                    <div>
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div>Thông báo</div>
                </Link>
            </div>
                </>: <>
                <div>
                <Link to={"/login"}>
                    <div>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </div>
                    <div>Đăng nhập</div>
                </Link>
            </div>
            <div>
                <Link to={"/signup"}>
                    <div>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                    <div>Đăng ký</div>
                </Link>
            </div>
                </>
            }
        </nav>
    )
}

export default NavBar;