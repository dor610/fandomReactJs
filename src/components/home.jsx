import Header from "./header/Header";
import NavBar from "./navBar";
import FriendList from "./friendList/FriendList";
import PostView from "./post/PostView";
import PostCreate from "./post/PostCreate";
import ProfileMin from "./profile/profileMin";
import Profile from "./profile/Profile";
import ScheduleMin from "./schedule/scheduleMin";
import AccountNavBar from "./account/AccountNavBar";
import style from "../css/home.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Account from "./account/Account";
import { useDispatch, useSelector } from "react-redux";
import AccountInfor from "./account/AccountInfo";
import AccountEditInfo from "./account/AccountEditInfo";
import AccountPost from "./account/AccountPost";
import MessageView from "./message/MessageView";
import MessageList from "./message/MessageList";
import UserChat from "./message/UserChat";
import Comment from "./comment/Comment";
import { ACCOUNT, ADMIN_DASHBOARD, ADMIN_POST, ADMIN_USER, COMMENT, MESSAGE, NOTIFICATION, PROFILE, SCHEDULE, USER_DETAIL } from "./path";
import ApprovalPage from "./admin/post/ApprovalPage";
import LockedPage from "./admin/post/LockedPage";
import { setCurrPath } from "../features/pathSlice";
import ErrorPage from "./ErrorPage";
import { getData, isLoggedIn } from "../util/localStorage";
import BannedPage from "./admin/BannedPage";
import PostEdit from "./post/PostEdit";
import Schedule from "./schedule/Schedule";
import Notification from "./notification/notification";
import AdminNavBar from "./admin/AdminNavBar";
import Dashboard from "./admin/dashboard/Dashboard";
import AdminUser from "./admin/user/AdminUser";
import AdminPost from "./admin/post/AdminPost";
import ApprovedPage from "./admin/post/ApprovedPage";
import RemovedPage from "./admin/post/RemovedPage";
import UserList from "./admin/user/UserList";
import BannedUserPage from "./admin/user/BannedUserPage";
import UserDetail from "./user/UserDetail";

const Home = () =>{

    const page = useSelector(state => state.variable);
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() =>{
        if(isLoggedIn()){
            setUser(JSON.parse(getData("user")));
        }
    }, []);

    useEffect(() =>{
        document.title = "Trang chủ";
        dispatch(setCurrPath(location.pathname));
    });

    const setLeftBarContent = () =>{
        if(isLagreContent()) return "";
        else{
            if(page.currentPage.includes(ACCOUNT)) return (<AccountNavBar />);
            else return (
                <>
                    <ProfileMin />
                    <ScheduleMin />
                </>
        )
        }
    }

    const isLagreContent = () =>{
        switch (page.currentPage){
            case MESSAGE: case PROFILE: case SCHEDULE: case COMMENT: case NOTIFICATION: case ADMIN_DASHBOARD: case ADMIN_POST: case ADMIN_USER: case USER_DETAIL:
                return true;
            default: return false;    
        }  
    }

    const leftBarGenerate = () =>{
        if(user){
            if(user.role === "ADMIN") return <AdminNavBar />
            else return <FriendList/>
        }
        return <></>
    }
    
 
    return (
        <div className={style.home} >
            <div className={style.header}>
                <Header></Header>
            </div>
            <div className={style.container} >
                <div className={style.leftBar}>
                    <NavBar />
                    {leftBarGenerate()}
                </div>
                <div className={isLagreContent() ? style.lagreContent : style.content} >
                    <Routes>
                        <Route index element={<PostView />}></Route>
                        <Route path="post/comment/:postId" element={<Comment/>}></Route>
                        <Route path="post/edit/:postId" element={<PostEdit />}></Route>
                        <Route path="createPost" element={<PostCreate postType={"text"} />} ></Route>
                        <Route path="profile" element={<Profile/>}></Route>
                        <Route path="schedule" element={<Schedule />}></Route>
                        <Route path="banned" element={<BannedPage />}/>
                        <Route path="admin" element={<Dashboard />}></Route>
                        <Route path="admin/user" element={<AdminUser/>}>
                            <Route index element={<UserList />}/>
                            <Route path="banned" element={<BannedUserPage />}/>
                        </Route>
                        <Route path="admin/post" element={<AdminPost/>}>  
                            <Route index element={<ApprovalPage/>}></Route>
                            <Route path="locked" element={<LockedPage/>}></Route>
                            <Route path="approved" element={<ApprovedPage />}></Route>
                            <Route path="removed" element={<RemovedPage />}></Route>
                        </Route>
                        <Route path="account" element={<Account/>}>
                            <Route index element={<AccountInfor/>}></Route>
                            <Route path="edit" element={<AccountEditInfo/>}></Route>
                            <Route path="post" element={<AccountPost/>} ></Route>
                        </Route>
                        <Route path="user/:account" element = {<UserDetail />}/>
                        <Route path='message' element={<MessageView/>}>
                            <Route index element={<MessageList />}></Route>
                            <Route path=":account" element={<UserChat/>}></Route>
                        </Route>
                        <Route path="notification" element={<Notification />}/>
                        <Route path="notFound" element={<ErrorPage type={"notFound"}/>}></Route>
                        <Route path="accessDenied" element={<ErrorPage type={"accessDenied"}/>}></Route>
                    </Routes>
                </div>
                <div className={style.rightBar}>
                    {setLeftBarContent()}
                </div>
            </div>
        </div>
    )
}

export default Home;