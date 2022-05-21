import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setCurrPath } from "../../features/pathSlice";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { isLoggedIn } from "../../util/localStorage";
import { warningNotify } from "../../util/notification";
import { MESSAGE } from "../path";

const MessageView = () =>{


    let isLogin = isLoggedIn();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);
    useEffect(() =>{
        dispatch(setCurrPath(location.pathname));
        if(!isLogin){
            warningNotify("Bạn cần đăng nhập để truy cập nội dung này");
            navigate("/access/login");
        }
    });

    useEffect(() =>{
        dispatch(setCurrentPage(MESSAGE));
    });

    return (
        <div>
            {isLogin? <Outlet/>: <></>}
        </div>
    )
}

export default MessageView;