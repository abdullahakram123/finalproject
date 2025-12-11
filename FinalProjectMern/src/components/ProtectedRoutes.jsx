import { Navigate } from "react-router-dom";
import {inLogged} from "./auth";
const ProtectedRoutes=({children})=>{
    if(!inLogged()){
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoutes;