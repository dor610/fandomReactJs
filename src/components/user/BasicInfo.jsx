import { miliSecToDateOnly } from "../../util/utils";
import style from "./user.module.css";


const BasicInfo = ({data}) =>{

    return (
        <div className={style.basicInfo}>
            <div>
                <img src={data.avatar} alt="" />
            </div>
            <div>
                <div>
                    <div>
                        Tài khoản: 
                    </div>
                    <div>{data.account}</div>
                </div>
                <div>
                    <div>Tên thành viên: </div>
                    <div>{data.userName}</div>
                </div>
                <div>
                    <div>Ngày sinh: </div>
                    <div>{miliSecToDateOnly(parseInt(data.dateOfBirth))}</div>
                </div>
                <div>
                    <div>Ngày tham gia: </div>
                    <div>{miliSecToDateOnly(data.createdDate)}</div>
                </div>
                <div>
                    <div>Email: </div>
                    <div>{data.email}</div>
                </div>
                <div>
                    <div>Trạng thái: </div>
                    <div>{data.status === "BANNED"? "Đã bị khoá": "Đang hoạt động"}</div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo;