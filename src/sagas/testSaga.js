import { put, takeLatest, call } from "redux-saga/effects";
import { setData, setTest } from "../features/variable/testSlice";
import { sendGetRequest } from "../util/utils";



export function* loadData(action){
    console.log(action);
    let data = yield call(sendGetRequest, "/");
    yield put(setTest(data.data));
    //console.log(data);
}

export function* watchLoadData(){
    yield takeLatest(setData,loadData);
}