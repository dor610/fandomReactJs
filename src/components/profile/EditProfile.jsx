import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasicInfo from "./edit/BasicInfo";
import LoadingAnimation from "../LoadingAnimation";
import style from "./profile.module.css";
import ConfirmBox from "../basics/ConfirmBox";
import LifeAndCareer from "./edit/LifeAndCareer";
import Activities from "./edit/Activities";
import Achievements from "./edit/Achievements";

const EditProfile = ({type, hide, setHide}) =>{

    const profile = useSelector(state => state.profile.profile);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false);

    useEffect(() =>{
        console.log(isOpenConfirmBox);
    }, [isOpenConfirmBox]);

    const setTitle = () =>{
        switch(type){
            case "basicInfo": return "Thông tin cơ bản";
            case "lifeAndCareer": return "Cuộc sống và sự nghiệp";
            case "activity": return "Hoạt động";
            case "achievements": return "Thành tựu";
            default: return "";
        }
    }

    const close = () =>{
        setIsSubmit(false);
        setHide(true);
    }

    const submit = () =>{
        setIsOpenConfirmBox(true);
    }

    return (
        <div className={style.editProfile + " " + (hide? style.hide: "")}>
            {Object.keys(profile).length > 0? <div>
                <div>{"Chỉnh sửa "+setTitle()}</div>
                {type === "basicInfo"? <BasicInfo setSubmit={setIsSubmit} submit={isSubmit} setLoading={setIsLoading} setHide={setHide}/>: ""}
                {type === "lifeAndCareer"? <LifeAndCareer setSubmit={setIsSubmit} submit={isSubmit} setLoading={setIsLoading} setHide={setHide}/>: ""}
                {type === "activities"? <Activities setSubmit={setIsSubmit} submit={isSubmit} setLoading={setIsLoading} setHide={setHide}/>: ""}
                {type === "achievements"? <Achievements setSubmit={setIsSubmit} submit={isSubmit} setLoading={setIsLoading} setHide={setHide}/>: ""}
                <div>
                    <button onClick={close}>Huỷ</button>
                    <button onClick={submit}>Lưu</button>
                </div>
            </div>: ""}
            <LoadingAnimation msg="Đang xử lý" showing={isLoading} />
            <ConfirmBox msg={"Xác nhận lưu chỉnh sửa " + setTitle()} isOpen={isOpenConfirmBox} onClose={setIsOpenConfirmBox} onConfirm={setIsSubmit}/>
        </div>
    )
}

export default EditProfile;

 /*{page === "lifeAndCareer"? <LifeAndCareer data={profile.lifeAndCareers}/>: ""}
                {page === "activity"? <CareerActivity />: ""}
                {page === "achievement"? <Achivement data={profile.achievements} />: ""}*/