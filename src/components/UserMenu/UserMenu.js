import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import useApi from "../../hooks/useApi.js";


const Usermenu = (props) => {
    const auth = useAuth();
    const api = useApi();
    const logOut = async () => {
        await api.logOut();
        auth.logOutF();
    }

        if (props.auth==="USER") {
            return (
                <div className="auth-status">
                            <div className="menuLink"><NavLink to="/heroes">my heroes</NavLink></div>
                            <div className="menuLink"><NavLink to="/me">{"settings"}</NavLink></div>
                            
                            <a className="menuLink" onClick={logOut}>{"logout"}</a>
                </div>
            )
        }
        return (
            <div className="auth-status">
                    <div className="menuLink"><NavLink to="/login">{"login"}</NavLink></div>
                    <div className="menuLink"><NavLink to="/register">{"register"}</NavLink></div>
            </div>
        );

        







}
export default Usermenu;