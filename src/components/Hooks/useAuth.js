import {useContext, createContext, useState} from "react";


const authContext = createContext({});

const goToHomePage = () => {
    window.location.assign('/home');
}


const useProvideAuth = (props) => {
    const loginF = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        goToHomePage();
    };
    const logOutF = async () => {
        localStorage.clear();
        goToHomePage();
    };

    return {
        storedData: JSON.parse(localStorage.getItem("user")),
        loginF,
        logOutF,
    };
}


export const ProvideAuth = ({children}) => {
   
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
        );
};

export const useAuth = () => {
    return useContext(authContext)
}