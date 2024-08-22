import {Routes, Route, Navigate } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Registration from "../pages/Registration";
import Authorization from "../pages/Authorization";
import User from "../pages/User";
import Admin from "../pages/Admin";
import { getUserRole } from "../../additional/requests";

export default function Main(){
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    const PrivateRoute = ({ element: Element, requiredRole }) => {
        if (!isAuthenticated()) {
            return <Navigate to="/" />;
        }

        const userRole = getUserRole();
        if (requiredRole && userRole !== requiredRole) {
            return <Navigate to="/user" />;
        }

        return <Element />;
    };

    return(
        <main className="content-inner">
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/user" element={<PrivateRoute element={User} />} />
                <Route path="/admin" element={<PrivateRoute element={Admin} requiredRole="admin"/>} />
            </Routes>
        </ main>
    );
}