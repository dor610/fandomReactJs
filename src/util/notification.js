import { toast } from "react-toastify";

export const processNotification = (notification) =>{
    //do something here
    console.log("new notification has arrived");
    console.log(notification);
    notify(notification.note+": " +notification.message);
}

export const successNotify = (msg, id) =>{
    toast.success(msg, {
        position: "bottom-right",
        autoClose: 2000,
        toastId: id,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const errorNotify = (msg, id) =>{
    toast.error(msg, {
        position: "bottom-right",
        autoClose: 2000,
        toastId: id,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const warningNotify = (msg, id) =>{
    toast.warn(msg, {
        position: "bottom-right",
        autoClose: 2000,
        toastId: id,        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const notify = (msg, id) =>{
    toast(msg, {
        position: "bottom-right",
        toastId: id,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}