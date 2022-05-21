import style from "./basic.module.css"

const DeleteForm = ({type = "post", showing = false, deleteFunc, closeFunc, msg}) =>{


    const deleteClick = () =>{
        deleteFunc(msg)
        closeFunc(false);
    }

    const getTitle = () =>{
        switch(type){
            case "post": return "bài viết";
            case "comment": return "bình luận";
            case "schedule": return "sự kiện";
            default: return "";
        }
    }

    return (
        <div className={showing? style.deleteForm: style.hide}>
            <div>
                <div>Xác nhận xoá {getTitle()}</div>
                <div>Bạn có thật sự muốn xoá?</div>
                <div>
                    <button onClick={deleteClick }>Chắc chắn</button>
                    <button onClick={e => closeFunc(false)}>Suy nghĩ lại</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteForm;