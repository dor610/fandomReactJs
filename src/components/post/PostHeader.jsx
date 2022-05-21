import style from "./post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PostHeader = () =>{
     return (
         <div className={style.postHeader}>
            <div>Nhà của Sheerios</div>
            <Link title="Tạo bài viết" to={"/createPost"} >
                <FontAwesomeIcon icon={faPenToSquare} />
                <div>Tạo bài viết</div>
            </Link>
         </div>
     );
}

export default PostHeader;