import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import { actionCreateAccount, actionLogin, setAuthToken, actionLoadUserData, setLoginError, setLoginSuccess, setSignupError, setSignupSuccess, setUser, actionLoadUserBasicData, setDetailUser, setDetailUserStatus } from "../features/userSlice";
import { setToken, setUserInfo } from "../util/localStorage";
import { Failed, Succeed } from "../util/requestState";
import { sendAuthGetRequest, sendGetRequest, sendLoginRequest, sendPostRequest } from "../util/utils";

export function* sagaCreateAccount(action){
    let data  = action.payload;
    let formData = new FormData();
    formData.append("account", data.account);
    formData.append("name", data.name);
    formData.append("password", data.password);
    formData.append("dob", data.dob);
    formData.append("email", data.email);

    let res = yield call(sendPostRequest, "/createAccount", formData);
    console.log(res);
    if(res.status !== 200){
        yield put(setSignupError({
            errorCode: res.status,
            isError: true
        }));
    }
    else {
        yield put(setSignupSuccess(true));
        yield put(actionLoadUserData());
    }
    console.log(res);
}

export function* sagaLogin(action){
    let data = action.payload.data;

    let formData = new FormData();
    formData.append('account', data.account);
    formData.append('password', data.password);

    let res = yield call(sendLoginRequest, formData);
    if(res.status === 200){
        
        setToken(res.authorization);

        yield put(setLoginSuccess(true));
        yield put(setAuthToken(res.authorization));
        yield put(actionLoadUserData(data.account));
        // dispatch action lấy thông tin user
    }else{
        yield put(setLoginError({
            errorCode: res.status,
            isError: true
        }));
    }
    console.log(res);
}

export function* sagaLoadUserData(action){
    let account = action.payload;
    let res = yield call(sendAuthGetRequest,"/user/"+account);
    if(res.status === 200){
        setUserInfo(res.data);
        yield put(setLoginSuccess(true));
    }else{
            
    }
}

export function* sagaLoaduserBasicData(action){
    let account = action.payload;
    let res = yield call(sendGetRequest, `/user/basic/${account}`);
    if(res.status === 200){
        let d = new Date(res.data.dateOfBirth);
        let user = {...res.data,dateOfBirth: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()};
        yield put(setDetailUser(user));
        yield put(setDetailUserStatus(Succeed));
    }else{
        yield put(setDetailUserStatus(Failed));
    }
}

export function* onUserAction(){
    yield takeEvery(actionCreateAccount, sagaCreateAccount);
    yield takeEvery(actionLogin, sagaLogin);
    yield takeEvery(actionLoadUserData, sagaLoadUserData);
    yield takeEvery(actionLoadUserBasicData, sagaLoaduserBasicData);
}