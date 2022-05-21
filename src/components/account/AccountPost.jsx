import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { ACCOUNT_POST } from "../path";
import style from "./account.module.css";
import Approved from "./post/Approved";
import Deleted from "./post/Deleted";
import Locked from "./post/Locked";
import PendingApprove from "./post/PendingApprove";
import {getData, isLoggedIn} from "../../util/localStorage";
import { setUserPostPage } from "../../features/userSlice";

const AccountPost = () =>{

    const dispatch = useDispatch();

    const page = useSelector(state => state.user.postPage);

    const [user, setUser] = useState(undefined);

    useEffect(() =>{
        if(isLoggedIn())
            setUser(JSON.parse(getData("user")));
    }, []);

    useEffect(() =>{
        dispatch(setCurrentPage(ACCOUNT_POST));
    })

    const changePage = (p) =>{
        if(p !== page){
            dispatch(setUserPostPage(p));
        }
    }

    return (
        <div className={style.post}>
            {user? <>
                <div>
                <div>Lịch sử bài viết</div>
                <div></div>
            </div>
            <div>
                <div className={style.postSelection + " " + (page === "pending"? style.postSelectionActive: "")} onClick={e => changePage("pending")} >Chờ duyệt</div>
                <div className={style.postSelection + " " + (page === "approved"? style.postSelectionActive: "")}  onClick={e => changePage("approved")} >Đã duyệt</div>
                <div className={style.postSelection + " " + (page === "locked"? style.postSelectionActive: "")}  onClick={e => changePage("locked")} >Bị khoá</div>
                <div className={style.postSelection + " " + (page === "deleted"? style.postSelectionActive: "")}  onClick={e => changePage("deleted")} >Bị xoá</div>
            </div>
            <div>
                {page === "pending"? <PendingApprove account={user.account}/>: <></>}
                {page === "approved"? <Approved account={user.account}/>: <></>}
                {page === "locked"? <Locked account={user.account}/>: <></>}
                {page === "deleted"? <Deleted account={user.account}/>: <></>}
            </div>
            </>: <div></div>}
        </div>
    )
}

export default AccountPost;