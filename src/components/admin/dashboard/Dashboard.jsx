import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../features/variable/variableSlice";
import { ADMIN_DASHBOARD } from "../../path";


const Dashboard = () =>{

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(setCurrentPage(ADMIN_DASHBOARD));
    })

    return (
        <div>

        </div>
    )
}

export default Dashboard;