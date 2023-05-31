import { Route, Routes, Navigate } from "react-router-dom"
import LoginForm from "./components/Login/login.js";
import RegisterForm from "./components/Register/register.js";
import { List } from "./components/List/List.js";
import HomePage from "./components/Homepage/Homepage.js";
import UserPage from "./components/UserPage/UserPage.js";
import Layout from "../src/components/Header/Header.js"
import ProtectedRouter from "./components/ProtectedRoutes/ProtectedRouter.js";

const MyRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/home" replace={true}/>}></Route>
                    <Route path="home" element={<HomePage/>}></Route>
                    <Route path="login" element={<LoginForm/>}></Route>
                    <Route path="register" element={<RegisterForm/>}></Route>
                    <Route element={<ProtectedRouter/>}> 
                        <Route path="/heroes" element={<List/>}></Route>
                        <Route path="/me" element={<UserPage/>}></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/home" replace={true}/>}></Route>
                </Route>
            </Routes>
    )
}

export default MyRoutes;