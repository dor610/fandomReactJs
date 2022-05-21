import React, { useCallback, useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/basic.css';
import style from "./css/app.module.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home';
import LoginPage from './components/access/loginPage';
import Login from './components/access/loginSection';
import Signup from './components/access/signupSection';
import ErrorPage from './components/ErrorPage';
import { ToastContainer } from 'react-toastify';
import { getData, isLoggedIn } from './util/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoadUserData, setAuthToken } from './features/userSlice';
import LoadingAnimation from './components/LoadingAnimation';
import { setIsBottom } from './features/variable/variableSlice';

import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { addMessageCurrentMessageList, addNewMessageCurrentMessageList } from './features/messageSlice';
import { addNotification } from './features/notificationSlice';
import { processNotification } from './util/notification';
import {url} from "./util/utils";

let stompClient;
let user;
let dispatch;

const connect =() =>{
  let socket = new SockJS(url+'/fandom');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected, onError);
}

const onConnected = () =>{
  // dang ky cac kenh
  console.log("sucusucsucsu    " + user.account);

  stompClient.subscribe('/user/queue/newMember',  (data) =>{
    let onlineUser = data.body.slice(1, data.body.length-1).split(',');
    console.log(onlineUser);
  });

  stompClient.subscribe('/topic/newMember', data =>{
    let friend = data.body
    console.log(friend);
  });

  stompClient.subscribe('/topic/disconnect', data =>{
    let friend = data.body;
    console.log(friend);
  });


    // Tell your username to the server
  sendMessage('/app/register', user.account);

  stompClient.subscribe(`/user/${user.account}/msg`,  data =>{
    let message = JSON.parse(data.body);
    let ob ={};
    ob[message.id] = message;
    processNotification({
      message: "Bạn có một tin nhắn mới",
      note: "Tin nhắn",
    })
    dispatch(addNewMessageCurrentMessageList(ob));
  });

  stompClient.subscribe(`/user/${user.account}/notification`, data =>{
    let notification = JSON.parse(data.body);
    let ob = {};
    ob[notification.id] = notification;
    dispatch(addNotification(ob));
    processNotification(notification);
  })

}

function sendMessage(url, message) {
  stompClient.send(url, {}, message);
}

const onError = () =>{
  console.log("Erorrororororo");
}

function App() {  
  dispatch = useDispatch();

  let isBottom = useSelector(state => state.variable.isBottom);
  const loadingAnimationShowing = useSelector(state => state.variable.loadingAnimation.isShowing);
  const loadingAnimationMsg = useSelector(state => state.variable.loadingAnimation.msg);
  
  const getUserData = ()=>{
          let account = JSON.parse(getData("user")).account;
          dispatch(setAuthToken(localStorage.getItem('token')));
          dispatch(actionLoadUserData(account));      
  }


  useEffect(() => {
    if(isLoggedIn()){
      getUserData();
      user = JSON.parse(getData("user"));
      connect();
    }
  }, []);

  const scroll = (e) =>{
    if(isBottom === false){
      if ( e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1){
        dispatch(setIsBottom(true));
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="App" onScroll={scroll}>
        <Routes>
          <Route exact path='/*' element={<Home/>}/>
          <Route path="/login" element={<LoginPage type="login"/>} />
          <Route path="/signup" element={<LoginPage type="signup"/>} />
          <Route path="/notFound" element={<ErrorPage type={"notFound"}/>}/>
          <Route path="/accessDenied" element={<ErrorPage type={"accessDenied"}/>}/>
        </Routes>
        <div className={loadingAnimationShowing? style.loadingAnimationContainer: style.hide}>
          <LoadingAnimation showing={loadingAnimationShowing} msg={loadingAnimationMsg}/>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"/>
      </div>
    </BrowserRouter>
  );
}

export {connect, stompClient, sendMessage};

export default App;
