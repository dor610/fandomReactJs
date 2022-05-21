import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { successNotify, errorNotify } from "../../util/notification";
import { actionLogin, setLoginError, setLoginSuccess } from "../../features/userSlice";
import { setCurrPath } from "../../features/pathSlice";
import style from "./loginPage.module.css";
import { isLoggedIn } from "../../util/localStorage";

const LoginSection = ({func}) =>{

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const prevPath = useSelector(state => state.path.prevPath);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let isSuccess = useSelector(state => state.user.login.isSuccess);
    let isError = useSelector(state => state.user.login.isError);

    useEffect(() =>{
        document.title = "Đăng nhập";
        dispatch(setCurrPath(location.pathname));
        if(isLoggedIn()){
            if(prevPath === "/login") navigate("/")
            else navigate(prevPath);
        }
    }, []);

    useEffect(() =>{
        if(isSuccess){
            successNotify('Đăng nhập thành công!', "login_successfully");
        
            dispatch(setLoginSuccess(false));
            setTimeout(() =>{
                if(prevPath === "/login") navigate("/")
                else navigate(prevPath);
            }, 1500);
        }

        if(isError){
            errorNotify("Đăng nhập thất bại! Vui lòng đăng nhập lại.", "login_error");
            dispatch(setLoginError({isError: false, errorCode: 0}))
        }
    })

    const login = e =>{
        e.preventDefault();
        
        let data = {
            account: account,
            password: password,
            rememberme: remember
        }
        //console.log(location.pathname);
        dispatch(actionLogin({data: data}));
    }

    return (
        <div className={style.form}>
            <form className={style.loginForm} onSubmit={login}>
                <div>
                    <div>Tên tài khoản</div>
                    <input required={true} value={account} onChange={e => {setAccount(e.currentTarget.value)}} type="text" />
                </div>
                <div>
                    <div>Mật khẩu</div>
                    <input required={true} value={password} onChange={e => {setPassword(e.currentTarget.value)}} type="password" />
                </div>
                <label className={style.checkBox}>Ghi nhớ đăng nhập
                    <input value={remember} onChange={e => setRemember(e.target.checked)} type="checkbox" />
                    <span className={style.checkMark}></span>
                </label>
                <button>Đăng nhập</button>
            </form>
            <div>
                <span>Chưa có tài khoản?</span>
                <span>
                    <Link to={"/signup"} replace={true}>Đăng ký</Link>
                </span>
            </div>
        </div>
    )
}

export default LoginSection;