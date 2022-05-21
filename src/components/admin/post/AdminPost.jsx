import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { setCurrPath } from "../../../features/pathSlice";
import { setCurrentPage } from "../../../features/variable/variableSlice";
import { ADMIN_POST } from "../../path";
import style from "./post.module.css";

const AdminPost = () =>{

    const dispatch = useDispatch();
    const page = useSelector(state => state.admin.post.page);
    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    useEffect(() =>{
        dispatch(setCurrentPage(ADMIN_POST));
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
                <Link className={page === "pending"? style.active: ""} to={"/admin/post"}>Đang chờ duyệt</Link>
                <Link className={page === "approved"? style.active: ""} to={"/admin/post/approved"}>Đã duyệt</Link>
                <Link className={page === "locked"? style.active: ""} to={"/admin/post/locked"}>Đã khoá</Link>
                <Link className={page === "removed"? style.active: ""} to={"/admin/post/removed"}>Đã xoá</Link>
            </div>
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default AdminPost;