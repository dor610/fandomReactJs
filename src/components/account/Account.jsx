import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "./account.module.css";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { setCurrPath } from "../../features/pathSlice";
import { isLoggedIn } from "../../util/localStorage";
import { warningNotify } from "../../util/notification";
import { ACCOUNT } from "../path";

const Account = () =>{

    const isLogin = isLoggedIn();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() =>{
        dispatch(setCurrPath(location.pathname));
        if(!isLogin){
            warningNotify("Bạn cần đăng nhập để truy cập nội dung này", "access_denied");
            navigate("/login");
        }
    }, []);

    useEffect(() => {
    })


    return (
        <div className={style.container}>
            {isLogin? <Outlet />: <></>}
        </div>
    )
}

export default Account;