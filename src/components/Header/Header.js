import { Outlet } from "react-router-dom";
import Usermenu from "../UserMenu/UserMenu.js";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import useApi from "../../hooks/useApi.js";

import "./styles.css"

const Header = () => {
    const [state, updateState] = useState("LOADING...");
    const auth = useAuth();
    const api = useApi();

    const check = async () => {
        if (!auth?.storedData?.accesToken) {
            return "LOGIN";
        }
        const checkRes = await api.check();
        if(checkRes.data.res==="ok"){
        }
        return checkRes.data;
    }

    const menu = () => {

        if (auth?.storedData?.user) {
            return "USER"
        }
        return "LOGIN";
    }

    const update = () =>{
        const newMenu = menu();
        updateState(newMenu);
    }
    const logOute2 = () => {
        auth.logOutF();
        update();
    }
    
    
    useEffect(()=>{
        check().then(update).catch(logOute2);
    },[])


    if (state === "LOADING...") {
        return (state);
    }
    if (state !== "LOADING...") {
    }


    return (
        <div>
            <div className="header">
                <div className="logo">
                    <div className="menuLink"><NavLink to="/home">Home</NavLink></div>
                </div> 
                <div className="usermenu">
                    <Usermenu auth={state} />
                </div>
                
            </div>

            <Outlet/>
        </div>
    )
}
export default Header;