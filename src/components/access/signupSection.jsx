import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionCreateAccount } from "../../features/userSlice";
import style from "./loginPage.module.css";
import { successNotify, errorNotify } from "../../util/notification";

const SingupSection = ({func}) =>{

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let isSuccess = useSelector(state => state.user.signup.isSuccess);
    let isError = useSelector(state => state.user.signup.isError)

    const signup = e =>{
        e.preventDefault();

        let data  = {
            account: account,
            password: password,
            confirmPassword: password,
            name: userName,
            dob: (new Date(dateOfBirth)).getTime(),
            email: email
        }
        console.log(data);
        dispatch(actionCreateAccount(data));
    }

    useEffect(() =>{
        document.title = "Đăng ký";
        
        if(isSuccess){
            successNotify("Đăng ký thành công", "signup_successfully");
            navigate("../login", {replace: true});
        }
        if(isError){
            errorNotify("Đăng ký thất bại! Vui lòng thử lại", "signup_error");
        }
    }, [isError, isSuccess, navigate]); 

    const accountValidate = () =>{
        if(account === "") return false;
    }

    return (
        <div className={style.form}>
            <form className={style.signupForm} onSubmit={signup}>
                <div>
                    <div>Tên tài khoản</div>
                    <input value={account} required={true} onChange={e => {setAccount(e.currentTarget.value)}} type="text" />
                </div>
                <div>
                    <div>Mật khẩu</div>
                    <input value={password} required={true} onChange={e => setPassword(e.currentTarget.value)} type="password" />
                </div>
                <div>
                    <div>Họ tên</div>
                    <input value={userName} required={true} onChange={e => setUserName(e.target.value)} type="text"/>
                </div>
                <div>
                    <div>Ngày sinh</div>
                    <input value={dateOfBirth} required={true} onChange={e => {setDateOfBirth(e.currentTarget.value)}} type="date" />
                </div>
                <div>
                    <div>Email</div>
                    <input value={email} required={true} onChange={e => setEmail(e.target.value)} type="text"/>
                </div>
                <button>Đăng ký</button>
            </form>
            <div>
                <span>Đã có tài khoản? </span>
                <span>
                    <Link to={"/login"} replace={true}>Đăng nhập</Link>
                </span>
            </div>
        </div>
    )
}

export default SingupSection;