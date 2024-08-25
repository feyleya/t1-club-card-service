import MenuButton from "./MenuButton";
import { useContext } from "react";
import { AppContext } from "../../additional/context";

export default function Menu(){
    const {cardActive} = useContext(AppContext);
    return (
        <div className="menu-block">
            <MenuButton name="Карта"/>
            <MenuButton name="QR-код"/>
            <MenuButton name="Профиль"/>
            {cardActive?(<MenuButton name="Персонализация"/>):""}
            
        </div>
    );
}