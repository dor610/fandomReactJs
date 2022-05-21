import { useEffect, useState } from "react";
import { getFullDate, miliSecToDateOnly, sendAuthPostResquest } from "../../../util/utils";
import { errorNotify, successNotify } from "../../../util/notification";
import style from "./edit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsReloadProfile } from "../../../features/profileSlice";

const BasicInfo = ({submit, setSubmit, setLoading, setHide}) =>{

    const dispatch = useDispatch();

    const data = useSelector(state => state.profile.profile.basicInfo);
    const links = useSelector(state => state.profile.profile.links);

    const [name, setName] = useState(data.name);
    const [altName, setAltName] = useState(data.altName);
    const [dateOfBirth, setDateOfBirth] = useState(getFullDate(new Date(parseInt(data.dateOfBirth))));
    const [placeOfBirth, setPlaceOfBirth] = useState(data.placeOfBirth);
    const [occupation, setOccupation] = useState(data.occupation);
    const [genres, setGenres] = useState(data.genres);
    const [yearActive, setYearActive] = useState(data.yearActive);
    const [spouse, setSpouse] = useState(data.spouse);
    const [children, setChildren] = useState(data.children);

    const [avatar, setAvatar] = useState(data.avatar.url);
    const [avatarFile, setAvatarFile] = useState("");
    const [avatarDes, setAvatarDes] = useState(data.avatar.description);

    const [isBasicInfoChanged, setIsBasicInfoChanged] = useState(false);
    const [isLinkChanged, setIsLinksChanged] = useState(false);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isAvatarDesChanged, setIsAvatarDesChanged] = useState(false);

    const [instagram, setInstagram] = useState("");
    const [officalWebsite, setOfficalWebsite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");

    const [spotify, setSpotify] = useState("");
    const [appleMusic, setAppleMusic] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() =>{
            setOfficalWebsite(links[0].url);
            setSpotify(links[1].url);
            setAppleMusic(links[2].url);
            setFacebook(links[3].url);
            setInstagram(links[4].url);
            setYoutube(links[5].url);
            setTwitter(links[6].url);
    },[]);

    useEffect(() =>{
        if(submit){
            let result = save();
            if(result){
                console.log(3);
                successNotify("Chỉnh sửa thành công", "basicInfo");
                setSubmit(false);
                setLoading(false);
                setHide(true);
            }else{
                errorNotify("Không thể cập nhật. Đã có lỗi xảy ra!");
            }
        }
    }, [submit])

    const previewAvatar = e =>{
        setIsAvatarChanged(true);
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatar(URL.createObjectURL(file));
        }
    }

    const save = async () =>{
        let result = true;
        if(isBasicInfoChanged){
            setIsBasicInfoChanged(false);
            let formData = new FormData();
            formData.append("name", name);
            formData.append("altName", altName);
            formData.append("dateOfBirth", (new Date(dateOfBirth)).getTime());
            formData.append("placeOfBirth", placeOfBirth);
            formData.append("occupation", occupation);
            formData.append("genres", genres);
            formData.append("spouse", spouse);
            formData.append("yearActive", yearActive);
            formData.append("children", children);
            console.log(1);
            let res = await sendAuthPostResquest("/profile/update/basicInfo", formData, "");
            if(res.status !== 200) {
                result = false;
            }else{
                
                dispatch(setIsReloadProfile(true));
            }
        }
        if(isLinkChanged){
            setIsLinksChanged(false);
            let formData = new FormData();
            formData.append("official", officalWebsite);
            formData.append("facebook", facebook);
            formData.append("instagram", instagram);
            formData.append("youtube", youtube);
            formData.append("twitter", twitter);
            formData.append("appleMusic", appleMusic);
            formData.append("spotify", spotify);
            let res = await sendAuthPostResquest("/profile/update/link", formData, "");
            if(res.status !== 200){
                result = false;
            }else{
                dispatch(setIsReloadProfile(true));
            }
        }
        if(isAvatarChanged){
            setIsAvatarChanged(false);
            console.log(avatarFile);
            let avatarData = new FormData();
            avatarData.append("avatar", avatarFile);
            avatarData.append("des", avatarDes);
            let res = await sendAuthPostResquest("/profile/update/avatar", avatarData, "multipart/form-data");
            if(res.status !== 200) {
                result = false;
            }else{
                dispatch(setIsReloadProfile(true));
            }
        }else if(isAvatarDesChanged){
            setIsAvatarDesChanged(false);
            let formData = new FormData();
            formData.append("des", avatarDes);
            let res = await sendAuthPostResquest("/profile/update/avatar/des", formData, "");
            if(res.status !== 200) {
                result = false;
            }else{
                dispatch(setIsReloadProfile(true));
            }
        }


        return result;
    }

    return (
        <div className={style.basicInfo}>
            <div>
                <div>
                        <img src={avatar} alt="" />
                        <input type="file" id="avatar-input" onChange={e => previewAvatar(e)} hidden/>
                        <div>Mô tả</div>
                        <input value={avatarDes} onChange={e => {setAvatarDes(e.target.value); setIsAvatarDesChanged(true)}} type={"text"} />
                        <label htmlFor="avatar-input">Đổi ảnh đại diện</label>
                </div>
                <div>
                    <div>
                        <div>Tên đầy đủ: </div>
                        <input value={name} onChange={e=> {setName(e.target.value); setIsBasicInfoChanged(true)}} type="text"></input>   
                    </div>
                    <div>
                        <div>Ngày sinh: </div>
                        <input value={dateOfBirth} onChange={e=> {setDateOfBirth(e.target.value); setIsBasicInfoChanged(true)}} type="date"></input> 
                    </div>
                    <div>
                        <div>Nguyên quán: </div>
                        <input value={placeOfBirth} onChange={e=> {setPlaceOfBirth(e.target.value); setIsBasicInfoChanged(true)}} type="text"></input>   
                    </div>
                    <div>
                        <div>Năm hoạt động: </div>
                        <input value={yearActive} onChange={e=> {setYearActive(e.target.value); setIsBasicInfoChanged(true)}} type={"text"}></input>   
                    </div>
                    <div>
                        <div>Nghề nghiệp: </div>
                        <input value={occupation} onChange={e=> {setOccupation(e.target.value); setIsBasicInfoChanged(true)}} type={"text"}></input>   
                    </div>
                    <div>
                        <div>Dòng nhạc: </div>
                        <input value={genres} onChange={e=> {setGenres(e.target.value); setIsBasicInfoChanged(true)}} type={"text"}></input>   
                    </div>
                    <div>
                        <div>Vợ: </div>
                        <input value={spouse} onChange={e=> {setSpouse(e.target.value); setIsBasicInfoChanged(true)}} type={"text"}></input>   
                    </div>
                    <div>
                        <div>Con: </div>
                        <input value={children} onChange={e=> {setChildren(e.target.value); setIsBasicInfoChanged(true)}} type={"text"}></input>   
                    </div>
                </div>
            </div>
                <div>
                    <div>Chỉnh sửa liên kết đến {altName}</div>
                    <div>
                        <div>
                            <div>Official Website</div>
                            <input value={officalWebsite} onChange={e => {setOfficalWebsite(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Facebook</div>
                            <input value={facebook} onChange={e =>{ setFacebook(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Instagram</div>
                            <input value={instagram} onChange={e =>{ setInstagram(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Twitter</div>
                            <input value={twitter} onChange={e =>{ setTwitter(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Spotify</div>
                            <input value={spotify} onChange={e =>{ setSpotify(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Youtube</div>
                            <input value={youtube} onChange={e =>{ setYoutube(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                        <div>
                            <div>Apple Music</div>
                            <input value={appleMusic} onChange={e =>{ setAppleMusic(e.target.value); setIsLinksChanged(true)}} type={"text"}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default BasicInfo;