import MenuButton from "./MenuButton";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";

export default function Menu(props){
    const { pages } = props; 
    const {cardActive} = useContext(AppContext);
    return (
        <div className="menu-block">
            {pages.map((page, index) => (
                <MenuButton key={index} name={page} />
            ))}
            {/* {cardActive?(<MenuButton name="Персонализация"/>):""} */}
            
        </div>
    );
}