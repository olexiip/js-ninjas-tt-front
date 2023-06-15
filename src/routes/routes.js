import { Route, Routes, Navigate } from "react-router-dom"
import LoginForm from "../pages/Login/login.js";
import RegisterForm from "../pages/Register/register.js";
import List from "../pages/List/List.js";
import HomePage from "../pages/Homepage/Homepage.js";
import Layout from "../components/Header/Header.js"
import ProtectedRouter from "../routes/ProtectedRouter.js";
import UserPage from "../pages/UserPage/UserPage.js";

const MyRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/home" replace={true}/>}></Route>
                    <Route path="home" element={<HomePage/>}></Route>
                    <Route path="login" element={<LoginForm/>}></Route>
                    <Route path="register" element={<RegisterForm/>}></Route>
                    <Route element={<ProtectedRouter/>}> 
                        <Route path="/me" element={<UserPage/>}></Route>
                        <Route path="/heroes" element={<List/>}></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/home" replace={true}/>}></Route>
                </Route>
            </Routes>
    )
}

export default MyRoutes;