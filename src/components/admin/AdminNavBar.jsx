import { faChartColumn, faFileCircleCheck, faFileCircleXmark, faFilePen, faUserLock, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADMIN_DASHBOARD, ADMIN_POST, ADMIN_USER } from "../path";
import style from "./admin.module.css"

const AdminNavBar = () =>{
    const page = useSelector(state => state.variable.currentPage);

     /*
        <div>
                <Link to={"/banned"}>
                    <div>
                        <FontAwesomeIcon icon={faUserLock} />
                    </div>
                    <div>Tài khoản bị khoá</div>
                </Link>
            </div>
            <div>
                <Link to={"/lockedPost"}>
                    <div>
                        <FontAwesomeIcon icon={faFileCircleXmark} />
                    </div>
                    <div>Bài viết bị khoá</div>
                </Link>
            </div>
     */

            /*
                <div className={page === ADMIN_DASHBOARD? style.activeBtn: ""}>
                <Link to={"/admin"}>
                    <div>
                        <FontAwesomeIcon icon={faChartColumn} />
                    </div>
                    <div>Thống kê</div>
                </Link>
            </div>
            */
     return(
        <nav className={style.navBar}>
            <div>Quản lý</div>
             
            <div className={page === ADMIN_POST? style.activeBtn: ""}>
                <Link to={"/admin/post"}>
                    <div>
                        <FontAwesomeIcon icon={faFilePen} />
                    </div>
                    <div>Bài viết</div>
                </Link>
            </div>
            <div className={page === ADMIN_USER? style.activeBtn: ""}>
                <Link to={"/admin/user"}>
                    <div>
                        <FontAwesomeIcon icon={faUserPen} />
                    </div>
                    <div>Người dùng</div>
                </Link>
            </div>
        </nav>
     )
}

export default AdminNavBar;