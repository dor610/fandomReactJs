import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminUserPage } from "../../../features/adminSlice";
import { setUserList } from "../../../features/userSlice";
import { setIsBottom } from "../../../features/variable/variableSlice";
import { getData, isLoggedIn } from "../../../util/localStorage";
import { errorNotify } from "../../../util/notification";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest } from "../../../util/utils";
import LoadingAnimation from "../../LoadingAnimation";
import User from "./User";
import style from "./user.module.css";

const UserList = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const page = useSelector(state => state.user.userList.page);
    const list = useSelector(state => state.user.userList.list);
    const isBottom = useSelector(state => state.variable.isBottom);

    const [user, setUser] = useState(null);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(Idle);

    useEffect(() =>{
        dispatch(setAdminUserPage("all"));

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
        let res = await sendAuthGetRequest("/user/count/all");
        if(res.status === 200){
            setCount(res.data);
        }
    }

    const loadData = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);
            let res = await sendAuthGetRequest(`/user/all/${page}`);
            if(res.status === 200){
                if(Object.keys(res.data).length < 20) setStatus(NoContent);
                else  setStatus(Succeed);
                dispatch(setUserList(res.data));
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
            <div>Có {count} thành viên đang hoạt động</div>
            <div>
                {Object.keys(list).map((u, i) =>{
                   return <User user={list[u]} key={"a_u_"+i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={status === Pending} msg='Đang tải'/>
            </div>
        </div>
    )
}

export default UserList;