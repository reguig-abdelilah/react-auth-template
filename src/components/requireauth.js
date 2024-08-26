import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useauth";

const RequireAuth = ({allowedRoles})=>{
    const {auth} = useAuth()
    const location = useLocation()
    return(
        auth?.roles?.find(role => allowedRoles?.includes(role)) 
        ? <Outlet /> 
        :  auth?.accessToken 
        ? <Navigate to='/unauthorized' replace state={{from:location}} />
        : <Navigate to='/login' replace state={{from:location}} />
    )
}

export default RequireAuth