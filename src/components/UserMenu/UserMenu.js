import { useAuth } from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import useApi from "../Hooks/useApi";

const Usermenu = (props) => {
    

    console.log(">>>Usermenu")
    const auth = useAuth();
    const api = useApi();
    const logOut = async () => {
        console.log("logOutF");
        await api.logOut();
        auth.logOutF();
    }
    //console.log(auth);

        if (props.auth==="USER") {
            console.log("return user menu");
            return (
                <div className="auth-status">
                            <NavLink to="/me"><button>{auth.storedData.user.userName}</button></NavLink>
                            
                            <button onClick={logOut}>{"logout"}</button>
                </div>
            )
        }


        console.log("return logIn menu");
        return (
            <div className="auth-status">
                    <NavLink to="/login"><button>{"login"}</button></NavLink>
                    <NavLink to="/register"><button>{"register"}</button></NavLink>
            </div>
        );

        







}
export default Usermenu;