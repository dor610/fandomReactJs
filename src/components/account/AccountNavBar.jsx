import { Link, useNavigate } from "react-router-dom";
import style from "./account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPen, faUserGear, faArrowRightFromBracket, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_EDIT, ACCOUNT_POST, ACCOUNT_PROFILE } from "../path";
import { removeUserInfo } from "../../util/localStorage";
import { successNotify } from "../../util/notification";
import { setLoginSuccess } from "../../features/userSlice";

const AccountNavBar = () =>{

    const page = useSelector(state => state.variable.currentPage);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () =>{
        removeUserInfo();
        dispatch(setLoginSuccess(false));
        navigate("/");
        successNotify("Đăng xuất thành công!");
    }
    
    useEffect(() =>{
       // console.log( "  " + page);
    })

    return (
        <div className={style.accountNavBar}>
            <Link to={"account"} className={page === ACCOUNT_PROFILE? style.activeBtn: ""} >
                <FontAwesomeIcon icon={faUser} />
                <div>Thông tin tài khoản</div>
            </Link>
            <Link to={"account/edit"} className={page === ACCOUNT_EDIT? style.activeBtn: ""} >
                <FontAwesomeIcon icon={faUserGear} />
                <div>Chỉnh sửa thông tin</div>
            </Link>
            <Link to={"account/post"} className={page === ACCOUNT_POST? style.activeBtn: ""} >
                <FontAwesomeIcon icon={faFilePen} />
                <div>Lịch sử bài viết</div>    
            </Link>       
            <div onClick={logout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                <div>Đăng xuất</div>    
            </div>     
        </div>
    )
}

export default AccountNavBar;
