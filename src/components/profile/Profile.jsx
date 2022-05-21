import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { PROFILE } from "../path";
import Achivement from "./Achievement";
import BasicInfo from "./BasicInfo";
import LifeAndCareer from "./LifeAndCareer";
import style from "./profile.module.css";
import { sendGetRequest } from "../../util/utils";
import { setIsReloadProfile, setProfile } from "../../features/profileSlice";
import EditProfile from "./EditProfile";
import { useLocation, useNavigate } from "react-router-dom";
import Activities from "./Activities";
import { getData, isLoggedIn } from "../../util/localStorage";
import { setCurrPath } from "../../features/pathSlice";
 
const Profile = () =>{

    const dispatch = useDispatch();
    const [page, setPage] = useState("basicInfo");
    const profile = useSelector(state => state.profile.profile);
    const isReload = useSelector(state => state.profile.isReload);
    const [hideEditPage, setHideEditPage] = useState(true);
    const [user, setUser] = useState("");


    const location = useLocation();
    const prevPath = useSelector(state => state.path.prevPath);

    const navigate = useNavigate();

    useEffect(() =>{
        dispatch(setCurrentPage(PROFILE));
        dispatch(setCurrPath(location.pathname));
        loadData();
        if(isLoggedIn()){
            setUser(JSON.parse(getData("user")));
        }
    }, []);

    useEffect(() =>{
        if(isReload){
            loadData();
        }
    }, [isReload]);



    const loadData = async () =>{
        let res = await sendGetRequest("/profile/get");
        console.log(res);
        if(res.status === 200){
            dispatch(setProfile(res.data));
            dispatch(setIsReloadProfile(false));
        }else{
            // đưa sang trang lỗi
        }
    }

    const back =() =>{
        navigate(prevPath);
    }

    const openBasicInfoSection = () =>{
        setPage("basicInfo");
    }

    const openLifeAndCareersSection = () =>{
        setPage("lifeAndCareer");
    }

    const openActivitiesSection = () =>{
        setPage("activities");
    }

    const openAchievementsSection = () =>{
        setPage("achievements");
    }

    return (
        <div className={style.profile}>
            <div>
                <div>
                    Thông tin nghệ sĩ
                </div>
                <button onClick={back} title="Trở lại">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
               
            </div>
            <div className={style.profileNavBar}>
                <div>
                    <button className={page=== "basicInfo"? style.activeBtn: ""} onClick={openBasicInfoSection}>Thông tin nghệ sĩ</button>
                    <button className={page=== "lifeAndCareer"? style.activeBtn: ""} onClick={openLifeAndCareersSection}>Cuộc đời và sự nghiệp</button>
                    <button className={page=== "activities"? style.activeBtn: ""} onClick={openActivitiesSection}>Hoạt động</button>
                    <button className={page=== "achievements"? style.activeBtn: ""} onClick={openAchievementsSection}>Giải thưởng</button>
                </div>
                {
                   ( user !== "" && user.role === "ADMIN")?  
                   <button onClick={e => setHideEditPage(false)}>
                   <FontAwesomeIcon icon={faPen} />
                   <div>Chỉnh sửa</div></button>: <></>
                }
               
            </div>
            {Object.keys(profile).length > 0? <div>
                {page === "basicInfo"? <BasicInfo/>: ""}
                {page === "lifeAndCareer"? <LifeAndCareer/>: ""}
                {page === "activities"? <Activities />: ""}
                {page === "achievements"? <Achivement data={profile.achievements} />: ""}

            </div>: ""}
            <EditProfile type={page} hide={hideEditPage} setHide={setHideEditPage}/>
        </div>
    )
}
export default Profile;