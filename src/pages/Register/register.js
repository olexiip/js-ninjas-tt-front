import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi.js";

const RegisterForm = () => {
    const api = useApi();
    const navigate = useNavigate();

    const [currentFormFields, setNewFormFields] = useState({
        userName: "",
        userSurname: "",
        userEmail: "",
        userPass: "",
        userPass2: "",
        userDateOfBirth: ""
    });
    
    const [showPass, setPassVisib] = useState(false);

    const showToastMSG = ()=> {
        alert("redir to ligin page 2sec");
    } 

    const showToastERR = (errMsg)=> {
        alert("REG ERR");

    } 

    const onFormChange = (key, e) => {
        setNewFormFields({...currentFormFields, ...{[key]: e.target.value}});
    }
    const onSubmitkHandler = async (e) => {
        
        e.preventDefault();

        const showErr = ()=> {
            showToastERR("Server error");
        }
        const req = await api.register(currentFormFields).catch(showErr);
        if (req?.data?.user) {
            console.log(req.data);
            showToastMSG();
            const redirect = ()=> {
                navigate("/login", {replace: true});
            }
            setTimeout(redirect, 2000);
            return [];
        }
        if (req?.data?.res=== "email already in use") {

            showToastERR("email already in use");
        }
        

    }

    const passVisibControllerLabel = () => {
        if(!showPass){
            return "show";
        }
        return "hide";
    }
    const passVisibController = () => {
        setPassVisib(!showPass);
    }


    const NameValidation = () =>{
        return ((currentFormFields.userName).length>0)
    };
    const SurnameValidation = () =>{
        return ((currentFormFields.userSurname).length>0)
    };
    const EmailValidation = () =>{
        return ((currentFormFields.userEmail).length>4)
    };
    const PassValidation = () =>{
        return ((currentFormFields.userEmail).length>4 && (currentFormFields.userPass).length>4 
        && currentFormFields.userPass===currentFormFields.userPass2)
    };




    const disabledRegButton = () => {
        if (NameValidation() && PassValidation()) {
            return false;
        }
        return true;
    };


    return (
        <div>
            <form className="login-form" onSubmit={onSubmitkHandler}> 
                <input 
                    type="text" 
                    value={currentFormFields.userName} 
                    className={NameValidation()?"auth":"auth bad-field"} 
                    placeholder="Name" 
                    onChange={(e) => onFormChange("userName", e)}
                />
                <input 
                    type="text" 
                    className={SurnameValidation()?"auth":"auth bad-field"} 
                    value={currentFormFields.userSurname} 
                    placeholder="Surname" 
                    onChange={(e) => onFormChange("userSurname", e)}
                />
                <input 
                    type="text" value={currentFormFields.userEmail} 
                    className={EmailValidation()?"auth":"auth bad-field"} 
                    placeholder="your email" 
                    onChange={(e) => onFormChange("userEmail", e)}
                />
                <br/>
                <div className="pass-wrapper">
                    <input 
                        type={showPass ? "text" : "password"} 
                        value={currentFormFields.userPass} 
                        className={PassValidation()?"auth":"auth bad-field"} 
                        placeholder="your pass" 
                        onChange={(e) => onFormChange("userPass", e)}
                    />
                    <div className="show-pass" onClick={passVisibController}>{passVisibControllerLabel()}</div>
                </div>
                <div className="pass-wrapper">
                    <input 
                        type={showPass ? "text" : "password"} 
                        value={currentFormFields.userPass2} 
                        className={PassValidation()?"auth":"auth bad-field"} 
                        placeholder="again pass" 
                        onChange={(e) => onFormChange("userPass2", e)}
                    />
                </div>
                <input 
                    type="text" 
                    className="auth"
                    value={currentFormFields.userDateOfBirth} 
                    placeholder="date of birth" 
                    onChange={(e) => onFormChange("userDateOfBirth", e)}
                />
                <button className = "login-button" disabled={disabledRegButton()} type="submit">Try register</button>
            </form>
        </div>

    )
}

export default RegisterForm;