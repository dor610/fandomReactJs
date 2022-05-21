import axios from "axios";
import {getData} from "./localStorage";

//export const url = "http://localhost:8080";
export const url = "https://fandomjava.herokuapp.com";

const generateHeader = (contentType = "") =>{
    let token = getData("token");
    let header = {authorization: token};
    if(token === null) header = {};
    if(contentType !== "") header = {...header, "Content-Type": contentType}
    return header;
}


/*
axios.interceptors.request.use(request => {
    console.log(request);
    return request
  })*/

export const sendGetRequest = (path, params) =>{
    return axios({
        method: "get",
        url: url+path,
    }).then(res => {return {
        status: res.status,
        data: res.data
    }}).catch(e => {
        if(e.response)
            return {status: e.response.status,
                data: e.response.data}
        else console.log("connection error")        
    });
}

export const sendAuthGetRequest = (path) =>{
    return axios({
        method: "get",
        url: url+path,
        headers: generateHeader(),
    }).then(res => {return {
        status: res.status,
        data: res.data
    }}).catch(e => {
        console.log(e.response);
        return {status: e.response.status,
                data: e.response.data}
    });
}


export const sendPostRequest = (path, data) =>{
    return axios({
        method: "post",
        url: url+path,
        data: data
    }).then(res => {return {
        status: res.status,
        data: res.data
    }}).catch(e => {
        console.log(e.response);
        return {status: e.response.status,
                data: e.response.data}
    });
}

export const sendAuthPostResquest = (path, data, contentType) =>{
    //console.log(generateHeader(contentType));
    return axios({
        method: "post",
        headers: generateHeader(contentType),
        url: url+path,
        data: data
    }).then(res => {return {
        status: res.status,
        data: res.data
    }}).catch(e => {
        if(e.response){
            console.log(e.response);
        return {status: e.response.status,
                data: e.response.data}
        }
        return {status: 600}
    });
}

export const sendMediaPostRequest = (path, data) =>{
    return axios({
        method: "post",
        headers: {...generateHeader(), 
            "post": {
                "Content-Type": "multipart/form-data"
              },},
        url: url+path,
        data: data
    }).then(res => {return {
        status: res.status,
        data: res.data
    }}).catch(e => {
        console.log(e.response);
        return {status: e.response.status,
                data: e.response.data}
    });
}

export const sendLoginRequest = (data) =>{
    return axios({
        method: "post",
        url: url + "/login",
        data: data
    }).then(res => {return {
        status: res.status,
        authorization: res.headers.authorization
    }}).catch(e => {
        console.log(e.response);
        return {status: e.response.status,
                data: e.response.data}
    });
}


export const miliSecToTime = miliSec =>{
    let sec = Math.floor(miliSec/1000);
    if(sec < 60) return sec + " giây trước"
    let min = Math.floor(sec/60);
    if(min < 60) return min + " phút trước";
    let h = Math.floor(min/60);
    if(h < 24) return h + " giờ trước";
    let day = Math.floor(h / 24);
    if(day < 7) return day + " ngày trước";
    let week = Math.floor(day/7);
    if(week < 4) return week + " tuần trước";
    let month = Math.floor(week / 4);
    if(month < 12) return month + " tháng trước";
    let year = Math.floor(month / 12);
    return year + " năm trước";
}

export const miliSecToDate = miliSec =>{
    let d = new Date(miliSec);
    let hour = d.getHours() < 10? "0"+d.getHours(): d.getHours();
    let minute = d.getMinutes() < 10? "0"+ d.getMinutes(): d.getMinutes()
    return hour+":"+minute + " - " +d.getUTCDate()+"/"+(d.getMonth() + 1)+"/"+d.getFullYear();
}

export const processMessageTime = (milisec) =>{
    let now = new Date();
    let d = new Date(milisec);
    if(d.getFullYear() === now.getFullYear() && now.getUTCMonth() === d.getUTCMonth() && d.getDate() === now.getDate())
        return miliSecToTime(now.getTime() - milisec);
    else return miliSecToDateOnly(milisec);    
}

export const miliSecToDateOnly = milisec =>{
    let dateOb = new Date(parseInt(milisec));
    let date = dateOb.getDate() < 10? "0"+dateOb.getDate(): dateOb.getDate();
    let month = dateOb.getUTCMonth() < 9? "0" + (dateOb.getUTCMonth() + 1): (dateOb.getUTCMonth() + 1);
    let year = dateOb.getFullYear();
    return `${date}/${month}/${year}`;
}

export const getFullDate = dateOb =>{
   let date = dateOb.getDate() < 10? "0"+dateOb.getDate(): dateOb.getDate();
   let month = dateOb.getUTCMonth() < 9? "0" + (dateOb.getUTCMonth() + 1): (dateOb.getUTCMonth() + 1);
   let year = dateOb.getFullYear();
   return year+"-"+month+"-"+date;}

export const generateChatId = (sender, recipient) =>{
    let chatId = "";
    if(sender > recipient)
        chatId = sender+recipient;
    else chatId = recipient+sender;

    return chatId;
}
