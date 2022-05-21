import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setNdCurrentPage } from "../../features/variable/variableSlice";
import style from "./account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ACCOUNT_PROFILE } from "../path";
import { getData, isLoggedIn } from "../../util/localStorage";
import { miliSecToDateOnly } from "../../util/utils";

const AccountInfor = () =>{

    const dispatch = useDispatch();
    let user = JSON.parse(getData("user"));
    
    useEffect(() =>{
        dispatch(setCurrentPage(ACCOUNT_PROFILE));
    }, []);

    return (
        <div className={style.accountProfile}>
            <div>
                <div>Thông tin tài khoản</div>
                <div className={user.role !== "ADMIN"? style.hide : ""} title="Khoá tài khoản">
                    <FontAwesomeIcon icon={faLock} />
                </div> 
            </div>
            <div className={style.profile}>
                <img src={user.avatar} alt="" />
                <div>
                    <div>
                        <div>Tài khoản: </div>
                        <div>{user.account}</div>
                    </div>
                    <div>
                        <div>Tên thành viên: </div>
                        <div>{user.userName}</div>
                    </div>
                    <div>
                        <div>Ngày sinh: </div>
                        <div>{miliSecToDateOnly(parseInt(user.dateOfBirth))}</div>
                    </div>
                    <div>
                        <div>Ngày tham gia: </div>
                        <div>{miliSecToDateOnly(user.createdDate)}</div>
                    </div>
                    <div>
                        <div>Email: </div>
                        <div>{user.email}</div>
                    </div>
                    <div>
                        <div>Trạng thái: </div>
                        <div>{user.status === "BANNED"? "Đã bị khoá": "Đang hoạt động"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfor;