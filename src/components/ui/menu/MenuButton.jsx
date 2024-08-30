import { useContext } from "react";
import { AppContext } from "../../../additional/context";

export default function MenuButton(props){
    const { curPage, updateState } = useContext(AppContext);
    const { name } = props;
    return (
        <button 
            className={"menu-item" + (curPage === name ? " selected" : "")}
            onClick={() => updateState({ curPage : name })}
        >
            {name}
        </button>
    );
}