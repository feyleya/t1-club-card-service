import {Routes, Route, Switch } from "react-router-dom";
import { ContextProvider } from "../../context";

import Homepage from "../pages/Homepage";
import Registration from "../pages/Registration";
import Authorization from "../pages/Authorization";

export default function Main(){
    return(
        <ContextProvider>
            <main className="content-inner">
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/authorization" element={<Authorization/>}/>
                </Routes>
            </ main>
        </ContextProvider>
    );
}