import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { createImagePostAction, createTextPostAction, createVideoPostAction, loadPostAction, setPostLoadingStatus, setPostCreatingStatus, addPostLoading, setPostDetailStatus, setPostDetail, loadPostDetailAction } from "../features/postSlice";
import { setIsBottom } from "../features/variable/variableSlice";
import { Failed, NoContent, Pending, Succeed } from "../util/requestState";
import { sendAuthGetRequest, sendAuthPostResquest, sendGetRequest } from "../util/utils";

export function* sagaCreateTextPost(action){
    let data = action.payload;

    let formData = new FormData();
    formData.append("author", data.author);
    formData.append("content", data.content);
    formData.append("title", data.title);
    console.log(formData);

    let res = yield call(sendAuthPostResquest, "/post/create/text", formData, "");
    console.log(res);
    if(res.status !== 200){
        yield put(setPostCreatingStatus(Succeed));
    }else{
        yield put(setPostCreatingStatus(Failed));
    }
}

export function* sagaCreateImagePost(action){
    let data = action.payload;

    let formData = new FormData();
    formData.append("author", data.author);
    formData.append("content", data.content);
    formData.append("title", data.title);
    formData.append("files", data.files);
    console.log(formData);

    let res = yield call(sendAuthPostResquest, "", formData, "");
    console.log(res);
    if(res.status !== 200){
        yield put(setPostCreatingStatus(Succeed));
    }else{
        yield put(setPostCreatingStatus(Failed));
    }
}

export function* sagaCreateVideoPost(action){
    let data = action.payload;

    let formData = new FormData();
    formData.append("author", data.author);
    formData.append("content", data.content);
    formData.append("title", data.title);
    formData.append("file", data.files);
    console.log(formData);

    let res = yield call(sendAuthPostResquest, "", formData, "");
    console.log(res);
    if(res.status !== 200){
        yield put(setPostCreatingStatus(Succeed));
    }else{
        yield put(setPostCreatingStatus(Failed));
    }
}

export function* onPostAction(){
    yield takeEvery(createTextPostAction, sagaCreateTextPost);
    yield takeEvery(createImagePostAction, sagaCreateImagePost);
    yield takeEvery(createVideoPostAction, sagaCreateVideoPost);
}