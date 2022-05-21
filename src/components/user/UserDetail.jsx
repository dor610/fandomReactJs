import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./user.module.css";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { USER_DETAIL } from "../path";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { sendAuthPostResquest, sendGetRequest } from "../../util/utils";
import BasicInfo from "./BasicInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan, faLockOpen, faMessage } from "@fortawesome/free-solid-svg-icons";
import PostStatus from "./PostStatus";
import { getData, isLoggedIn } from "../../util/localStorage";
import PostList from "./PostList";
import { setCurrPath } from "../../features/pathSlice";
import LockForm from "../basics/LockForm";
import { errorNotify, successNotify } from "../../util/notification";

const UserDetail = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {account} = useParams("account");
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);

    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    useEffect(() =>{
        dispatch(setCurrPath(location.pathname));
        dispatch(setCurrentPage(USER_DETAIL));
        loadBasicData();
    }, []);

    const loadBasicData = async () =>{
        let res = await sendGetRequest(`/user/basic/${account}`);
        if(res.status === 200){
            setUser(res.data);
            document.title = "Thông tin của " + res.data.userName;
        }
    }

    const ban = async (note) =>{
        let formData = new FormData();
        formData.append("account", account);
        formData.append("note", note);
        let res = await sendAuthPostResquest("/user/ban", formData, "");
        if(res.status === 200){
            successNotify("Khoá tài khoản thành công");
            back();
        }else{
            errorNotify("Đã có lỗi xảy ra");
        }
    }

    const unBan = async () =>{
        let formData = new FormData();
        formData.append("account", account);
        let res = await sendAuthPostResquest("/user/unban", formData, "");
        if(res.status === 200){
            successNotify("Đã mở khoá tài khoản thành công");
            loadBasicData();
        }else{
            errorNotify("Đã có lỗi xảy ra");
        }
    }

    const back =() =>{
        navigate(prevPath);
    }


    return (
        <div className={style.container}>
            <div>
                <div>Thông tin của {user.userName}</div>
                <div>
                    {user.status === "BANNED" && isLoggedIn()? JSON.parse(getData("user")).role === "ADMIN"? <button onClick={unBan} title="Mở khoá tài khoản">
                        <FontAwesomeIcon title="Mở khoá tài khoản" icon={faLockOpen}/>
                    </button>: <></>: <></>}
                    {user.status !== "BANNED" && user.role !== "ADMIN"?  <button onClick={e => setShow(true)} title="Khoá tài khoản">
                        <FontAwesomeIcon title="Khoá tài khoản" icon={faBan} />
                    </button>: <></>}
                    {isLoggedIn()? JSON.parse(getData("user")).account !== account? <button onClick={e => navigate(`/message/${user.account}`)} title={"gửi tin nhắn đến " + user.userName}>
                        <FontAwesomeIcon  title={"gửi tin nhắn đến " + user.userName} icon={faMessage} />
                    </button>: <></>:<></>}
                    <button onClick={back} title={"Trở lại"}>
                        <FontAwesomeIcon title={"Trở lại"} icon={faArrowLeft}/>
                    </button>
                </div>
            </div>
            <BasicInfo data={user}/>
            {isLoggedIn()? JSON.parse(getData("user")).role === "ADMIN"? <PostStatus account={account}/>: <></>:<></>}
            <div className={style.title}>Danh sách bài viết</div>
            <PostList account={account} />
            <LockForm setShowing={setShow} showing={show} func={ban}/>
         </div>
    )
}

export default UserDetail;