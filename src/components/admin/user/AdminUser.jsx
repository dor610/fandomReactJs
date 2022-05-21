import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { setCurrentPage } from "../../../features/variable/variableSlice";
import { ADMIN_USER } from "../../path";
import { setCurrPath } from "../../../features/pathSlice";
import style from "./user.module.css";

const AdminUser = () =>{
    
    const dispatch = useDispatch();
    const page = useSelector(state => state.admin.user.page);
    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    useEffect(() =>{
        dispatch(setCurrentPage(ADMIN_USER));
        dispatch(setCurrPath(location.pathname));
    })

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div>Quản lý bài viết</div>
                <Link to={"/"} >
                    <FontAwesomeIcon icon={faSquareCaretLeft}/>
                    <div>Trở về</div>
                </Link>
            </div>
            <div className={style.navBar}>
                <Link className={page === "all"? style.active: ""} to={"/admin/user"}>Thành viên đang hoạt động</Link>
                <Link className={page === "banned"? style.active: ""} to={"/admin/user/banned"}>Thành viên bị khoá</Link>
            </div>
            <div>
                <Outlet />
            </div>

        </div>
    )
}
export default AdminUser;