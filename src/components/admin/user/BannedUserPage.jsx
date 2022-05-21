import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminUserPage } from "../../../features/adminSlice";
import { setBannedUser, setUserList } from "../../../features/userSlice";
import { setIsBottom } from "../../../features/variable/variableSlice";
import { getData, isLoggedIn } from "../../../util/localStorage";
import { errorNotify } from "../../../util/notification";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest } from "../../../util/utils";
import LoadingAnimation from "../../LoadingAnimation";
import style from "./user.module.css";
import User from "./User";

const BannedUserPage = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const page = useSelector(state => state.user.bannedUser.page);
    const list = useSelector(state => state.user.bannedUser.list);
    const isBottom = useSelector(state => state.variable.isBottom);

    const [user, setUser] = useState(null);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(Idle);

    useEffect(() =>{
        dispatch(setAdminUserPage("banned"));

        if(isLoggedIn()){
            setUser(JSON.parse(getData("user")));
            if(JSON.parse(getData("user")).role !== "ADMIN"){
                navigate("/accessDenied");
            }
        }

        getCount();
        loadData();
    }, []);


    useEffect(() =>{
        if(isBottom){
            loadData();
        }
    })


    const getCount = async () =>{
        let res = await sendAuthGetRequest("/user/count/banned");
        if(res.status === 200){
            setCount(res.data);
        }
    }

    const loadData = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);
            let res = await sendAuthGetRequest(`/user/banned/${page}`);
            if(res.status === 200){
                if(Object.keys(res.data).length < 20) setStatus(NoContent);
                else  setStatus(Succeed);
                dispatch(setBannedUser(res.data));
                dispatch(setIsBottom(false));
            }else{
                dispatch(setIsBottom(false));
                setStatus(Failed);
                errorNotify("Có lỗi gì đó đã xảy ra 😔");
            }
        }
    }

    return (
        <div className={style.userList}>
            <div>Có {count} thành viên đang bị khoá</div>
            <div>
                {Object.keys(list).map((u, i) =>{
                   return <User user={list[u]} type="banned" key={"a_u_"+i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={status === Pending} msg='Đang tải'/>
            </div>
        </div>
    )
}

export default BannedUserPage;