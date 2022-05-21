import { all } from 'redux-saga/effects';
import { onUserAction } from './accountSaga';
import { watchLoadData } from './testSaga';
import { onPostAction } from './postSaga';

export default function* rootSaga() {
    yield all([ // gọi nhiều saga
       watchLoadData(),
       onUserAction(),
       onPostAction(),
    ]);
}