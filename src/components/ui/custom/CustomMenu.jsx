import CustomMenuButton from "./CustomMenuButton";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";
import { setNewDesign } from "../../../additional/requests";

export default function CustomMenu(props){
    const { chapter, setChapter, newColor, newType} = props;
    const { cardColor, cardType, updateState} = useContext(AppContext);

    const handleClick = () => {
        const req = setNewDesign(newColor, newType);
        if(req){
            updateState({ cardColor: newColor});
            updateState({ cardType: newType});
        }
    }

    return (
        <div className="custom-menu-block">
            <CustomMenuButton chapter={chapter} setChapter={setChapter} name={"Цвет"}/>
            <CustomMenuButton chapter={chapter} setChapter={setChapter} name={"Дизайн"}/>
            {(cardColor !== newColor || cardType !== newType)?(
                <button 
                    type="submit" 
                    className="button filed"
                    onClick={handleClick}
                >
                    Сохранить
                </button>
            ):""}
        </div>
    );
}