import { useAuth } from "../Hooks/useAuth.js";
import { useState } from "react";
import useApi from "../Hooks/useApi.js";


const LoginForm = () => {
    const auth = useAuth();
    const api = useApi();

    console.log(auth)

    const [newEmailTyped, setNewEmailTyped] = useState("");
    
    const onTypeEmailHandler = (e) => {
        setNewEmailTyped(e.target.value);
    } 
    const [newPassTyped, setNewPassTyped] = useState("");
    const onTypePassHandler = (e) => {
        setNewPassTyped(e.target.value);
    };

    const showToastERR = (errMsg)=> {
        const msg = (errMsg?errMsg:"auth failed");
        alert(msg);

    } 

     const onSubmitkHandler = async (e) => {
        e.preventDefault();
        console.log("click");
        const showErr = ()=> {
            showToastERR("Server error");
        }
        //console.log(`login: ${newEmailTyped} pass: ${newPassTyped}`)
        const loginResp = await api.logIn({email : newEmailTyped, userpass : newPassTyped}).catch(showErr);
        console.log(loginResp.data);
        if (loginResp.data.accesToken) {
            return auth.loginF(loginResp.data);
        }
        if (loginResp.data.res === "bad login data") {
            console.log("err")
            showToastERR();
        }
        console.log("final")
        //window.location.assign(window.location.pathname);
        
    }

    const disabledLoginButton = () => {
        if (newEmailTyped.length>4 && newPassTyped.length>4) {
            return false;
        }
        return true;
    };
    
    return (
        <div>
            <form className="login-form" onSubmit={onSubmitkHandler}> 
                <input type="text" value={newEmailTyped} className="inputLogin" placeholder="your email" onChange={onTypeEmailHandler}/>
                <br/>
                <input type="password" value={newPassTyped} className="inputLogin" placeholder="your pass" onChange={onTypePassHandler}/>
                <br/>
                <button className = "login-button" disabled={disabledLoginButton()} type="submit">login</button>
            </form>
        </div>

    )
}

export default LoginForm;