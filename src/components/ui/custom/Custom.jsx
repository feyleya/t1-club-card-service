import { useState, useContext } from "react";
import CustomMenu from "./CustomMenu";
import { AppContext } from "../../../additional/context";
import Changer from "./Changer";

export default function Custom(){
    const { cardColor, cardType} = useContext(AppContext);
    const [chapter, setChapter] = useState("Цвет");

    const [ newColor, setNewColor] = useState(cardColor);
    const [ newType, setNewType ] = useState(cardType);

    const colorBlocks = [
        { id: 1, color: "white", type: cardType, important: "color" },
        { id: 2, color: "blue", type: cardType, important: "color" },
        { id: 3, color: "black", type: cardType, important: "color" },
    ];

    const designBlocks = [
        { id: 1, color: cardColor, type: "default", important: "type" },
        { id: 2, color: cardColor, type: "corner", important: "type" },
        { id: 3, color: cardColor, type: "center", important: "type" },
    ];

    return (
        <div className="custom-page-block">
            <CustomMenu chapter={chapter} setChapter={setChapter} newColor={newColor} newType={newType} />
            {chapter === "Цвет" ? (
                <Changer newValue={newColor} setNewValue={setNewColor} blocks={colorBlocks} />
            ) : (
                <Changer newValue={newType} setNewValue={setNewType} blocks={designBlocks} />
            )}
        </div>
    );
}