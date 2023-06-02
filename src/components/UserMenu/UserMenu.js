import { useAuth } from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import useApi from "../Hooks/useApi";


const Usermenu = (props) => {
    

    console.log(">>>Usermenu")
    const auth = useAuth();
    const api = useApi();
    const logOut = async () => {
        await api.logOut();
        auth.logOutF();
    }

        if (props.auth==="USER") {
            console.log("return user menu");
            return (
                <div className="auth-status">
                            <div className="menuLink"><NavLink to="/me">{auth.storedData.user.userName}</NavLink></div>
                            
                            <a className="menuLink" onClick={logOut}>{"logout"}</a>
                </div>
            )
        }


        console.log("return logIn menu");
        return (
            <div className="auth-status">
                    <div className="menuLink"><NavLink to="/login">{"login"}</NavLink></div>
                    <div className="menuLink"><NavLink to="/register">{"register"}</NavLink></div>
            </div>
        );

        







}
export default Usermenu;