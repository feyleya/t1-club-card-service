import { useContext } from "react";
import { AppContext } from "../../additional/context";

export default function MenuButton(props){
    const { curPage, changePage } = useContext(AppContext);
    const { name } = props;
    return (
        <button 
            className={"menu-item" + (curPage === name ? " selected" : "")}
            onClick={() => changePage(name)}
        >
            {name}
        </button>
    );
}