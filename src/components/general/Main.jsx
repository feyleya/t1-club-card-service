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
    const { tempStatus } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        changeStatus(tempStatus);
        switch(tempStatus){
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
    }, [tempStatus]);

    const PrivateRoute = ({ element: Element, requiredRole }) => {
        const { tempStatus } = useContext(AppContext);

        if (tempStatus === 90 || tempStatus === 91) {
            return <Navigate to="/" />;
        }
        // if (requiredRole === userRole && (tempStatus === 93 || tempStatus === 94) ) {
        //     return <Navigate to="/admin" />;
        // }

        // if ((requiredRole === userRole || userRole === "superadmin") && tempStatus === 92) {
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