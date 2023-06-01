
import { Outlet } from "react-router-dom";

import Usermenu from "../UserMenu/UserMenu.js";
import { NavLink } from "react-router-dom";
import useApi from "../Hooks/useApi.js";
import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth.js";

const Header = () => {

    console.log(">>>Header");

    const [state, updateState] = useState("LOADING...");
    const auth = useAuth();
    const api = useApi();

    //console.log("Usermenu")

    const check = async () => {
        console.log("start check auth")
        if (!auth?.storedData?.accesToken) {
            console.log("LS empty > return login")
            return "LOGIN";
        }
        console.log("start check auth with back end")
        const checkRes = await api.check();
        if(checkRes.data.res==="ok"){
            console.log("auth ok")
        }
        return checkRes.data;
    }

    const menu = () => {

        if (auth?.storedData?.user) {
            //console.log("LS USER");
            return "USER"
        }
        //console.log("LS EMPTY");
        return "LOGIN";
    }

    const update = () =>{
        const newMenu = menu();
        updateState(newMenu);
    }
    const logOute2 = () => {
        console.log("check auth return error, >>> do logOute");
        auth.logOutF();
        console.log("logOute2 -----");
        //console.log(auth.storedData);
        update();
    }
    
    
    useEffect(()=>{
        check().then(update).catch(logOute2);
    },[])


    //return state;
    if (state === "LOADING...") {
        console.log("return LOADING...");
        return (state);
    }
    if (state !== "LOADING...") {
        console.log("return normal page");
    }


    return (
        <div>
            <div className="header">
                <div className="logo">
                    <NavLink to="/home">Home</NavLink>
                </div> 
                <div className="usermenu">
                    <Usermenu auth={state} />
                </div>
                
            </div>
            <hr/>
            <Outlet/>
        </div>
    )







    
}
export default Header;