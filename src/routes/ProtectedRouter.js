import { useAuth } from "../hooks/useAuth.js";
import  {Navigate, useLocation, Outlet}  from "react-router-dom";

const ProtectedRouter = () => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth?.storedData) {
        return <Navigate to ="/login" state={{from:location}} replace = {true}/>
    }
    return (<Outlet />);
};
export default ProtectedRouter;