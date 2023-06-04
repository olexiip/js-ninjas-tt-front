import { useAuth } from "../Hooks/useAuth.js";
import { useState } from "react";
import useApi from "../Hooks/useApi.js";


const LoginForm = () => {
    const auth = useAuth();
    const api = useApi();

    const [newEmailTyped, setNewEmailTyped] = useState("");
    const [newPassTyped, setNewPassTyped] = useState("");
    

    const onTypeEmailHandler = (e) => {
        setNewEmailTyped(e.target.value);
    } 

    const onTypePassHandler = (e) => {
        setNewPassTyped(e.target.value);
    };

    const showToastERR = (errMsg)=> {
        const msg = (errMsg?errMsg:"auth failed");
        alert(msg);
    } 

    const onSubmitkHandler = async (e) => {
        e.preventDefault();
        const showErr = ()=> {
            showToastERR("Server error");
        }

        try {
            const loginResp = await api.logIn({email : newEmailTyped, userpass : newPassTyped});

            if (loginResp?.data?.res === "bad login data") {
                showToastERR("access denied");
            }
            if (loginResp.message) {
                showToastERR(loginResp.message);
            }
            if (loginResp?.data?.accesToken) {
                return auth.loginF(loginResp.data);
            }
        } catch (e) {
            console.log(e);
            showToastERR("Something went wrong...");
        }
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
                <input type="text" value={newEmailTyped} className="auth" placeholder="your email" onChange={onTypeEmailHandler}/>
                <br/>
                <input type="password" value={newPassTyped} className="auth" placeholder="your pass" onChange={onTypePassHandler}/>
                <br/>
                <button className = "login-button" disabled={disabledLoginButton()} type="submit">login</button>
            </form>
        </div>

    )
}

export default LoginForm;