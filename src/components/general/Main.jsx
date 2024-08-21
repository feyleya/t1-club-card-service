import {Routes, Route, Navigate } from "react-router-dom";
import { ContextProvider } from "../../context";

import Homepage from "../pages/Homepage";
import Registration from "../pages/Registration";
import Authorization from "../pages/Authorization";
import User from "../pages/User";

export default function Main(){
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token; 
    };

    const PrivateRoute = ({ element: Element }) => {
        return isAuthenticated() ? <Element /> : <Navigate to="/" />;
    };

    return(
        <ContextProvider>
            <main className="content-inner">
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/user" element={<PrivateRoute element={User} />} />
                </Routes>
            </ main>
        </ContextProvider>
    );
}