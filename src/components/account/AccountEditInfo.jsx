import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./account.module.css";
import { ACCOUNT_EDIT } from "../path";
import { getData, isLoggedIn, setData } from "../../util/localStorage";
import DeleteForm from "../basics/DeleteForm";
import { errorNotify, successNotify, warningNotify } from "../../util/notification";
import { getFullDate, sendAuthGetRequest, sendAuthPostResquest } from "../../util/utils";

const AccountEditInfo = () =>{

    const dispatch = useDispatch();

    let user = JSON.parse(getData("user"));
    
    let d = new Date(user.dateOfBirth);

    const [name, setName] = useState(user.userName);
    const [dateOfBirth, setDateOfBirth] = useState(getFullDate(new Date(parseInt((user.dateOfBirth)))));
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar);
    const [reload, setReload] = useState(false);

    useEffect(() =>{
        dispatch(setCurrentPage(ACCOUNT_EDIT));
    },[])

    useEffect(() =>{
        if(reload){
            loadData();
        }
    }, [reload]);

    const previewAvatar = e =>{
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setAvatar([e.target.files[0]]);
        }
    }

    const loadData = async () =>{
        let res = await sendAuthGetRequest(`/user/${user.account}`);
        if(res.status === 200){
            setData("user", JSON.stringify(res.data));
        }
    }

    const save = async () =>{
        if(validate()){
            let formData = new FormData();
            formData.append("account", user.account);
            formData.append("name", name);
            formData.append("dob", (new Date(dateOfBirth)).getTime());
            formData.append("email", email);
            if(avatar.length > 0){
                formData.append("avatar", avatar[0]);
                let res = await sendAuthPostResquest("/user/edit/avatar", formData, "multipart/form-data");
                if(res.status === 200){
                    successNotify("Thay đổi thông tin thành công");
                    setReload(true);
                }else{
                    errorNotify("Có lỗi gì đó đã xảy ra");
                }
            }else{
                let res = await sendAuthPostResquest("/user/edit", formData, "");
                if(res.status === 200){
                    successNotify("Thay đổi thông tin thành công");
                    setReload(true);
                }else{
                    errorNotify("Có lỗi gì đó đã xảy ra");
                }
            }
        }else{
            warningNotify("Thông tin không hợp lệ", "edit_account");
        }
    }

    const validate = () =>{
        if(!name) return false;
        if(!email) return false;
        return true;
    }

    return (
        <div className={style.accountEdit}>
        <div>
            <div>Chỉnh sửa thông tin tài khoản</div>
            <button onClick={save} title="Lưu chỉnh sửa">
                <FontAwesomeIcon icon={faClipboardCheck}/>
                Lưu
            </button> 
        </div>
        <div className={style.edit}>
            <div>
                <img src={avatarPreview} alt="" />
                <input type="file" id="avatar-input" onChange={e => previewAvatar(e)} hidden/>
                <label htmlFor="avatar-input">Đổi ảnh đại diện</label>
            </div>
            <div>
                <div>
                    <div>Tên tài khoản:</div>
                    <div>{user.account}</div>
                </div>
                <div>
                    <div>Họ tên: </div>
                    <input value={name} onChange={e => setName(e.target.value)}type="text" />
                </div>
                <div>
                    <div>Ngày sinh:</div>
                    <input value={dateOfBirth} max={"2010-1-1"} onChange={e => setDateOfBirth(e.target.value)}type="date" />
                </div>
                <div>
                    <div>Email:</div>
                    <input value={email} onChange={e => setEmail(e.target.value)}type="text" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default AccountEditInfo;