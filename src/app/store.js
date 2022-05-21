import { configureStore } from '@reduxjs/toolkit';
import variableSlice from '../features/variable/variableSlice';
import testSlice from '../features/variable/testSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import userSlice from '../features/userSlice';
import postslice from '../features/postSlice';
import pathSlice from "../features/pathSlice";
import commentSlice from '../features/commentSlice';
import profileSlice from '../features/profileSlice';
import messageSlice from '../features/messageSlice';
import notificationSlice from '../features/notificationSlice';
import adminSlice from '../features/adminSlice';
import searchSlice from '../features/searchSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    variable: variableSlice,
    test: testSlice,
    user: userSlice,
    post: postslice,
    path: pathSlice,
    message: messageSlice,
    comment: commentSlice,
    profile: profileSlice,
    notification: notificationSlice,
    admin: adminSlice,
    search: searchSlice
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({thunk:false}), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);