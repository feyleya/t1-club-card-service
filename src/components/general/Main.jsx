import {Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../additional/context";

import { getUserRole, changeStatus } from "../../additional/requests";

import Homepage from "../pages/Homepage";
import Registration from "../pages/Registration";
import Authorization from "../pages/Authorization";
import User from "../pages/User";
import Admin from "../pages/Admin";


export default function Main(){
    const { status } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        changeStatus(status);
        switch(status){
            case 91:
                navigate("/login");
                break;
            case 92:
                navigate("/user");
                break;
            case 93:
            case 94:
                navigate("/admin");
                break;
        }       
    }, [status]);

    const PrivateRoute = ({ element: Element, requiredRole }) => {
        const { status } = useContext(AppContext);

        if (status === 90 || status === 91) {
            return <Navigate to="/" />;
        }
        // if (requiredRole === userRole && (status === 93 || status === 94) ) {
        //     return <Navigate to="/admin" />;
        // }

        // if ((requiredRole === userRole || userRole === "superadmin") && status === 92) {
        //     return <Navigate to="/user" />;
        // }

        return <Element />;
    };


    return(
        <main className="content-inner">
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/user" element={<PrivateRoute element={User} requiredRole="user"/>} />
                <Route path="/admin" element={<PrivateRoute element={Admin} requiredRole="admin"/>} />
            </Routes>
        </ main>
    );
}