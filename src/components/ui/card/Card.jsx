import ChipLogo from "./ChipLogo";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";

const images = require.context('../../../card_images', false, /\.(jpg|jpeg|png)$/);

export default function Card(){
    const { cardStyle, privilegia } = useContext(AppContext);
    const color = cardStyle.split("-")[0];
    const type = cardStyle.split("-")[1];
    const textColor = (color === "white"?"var(--blue)":"white");
    const backgroundImage = images(`./${color}-${privilegia}.jpg`);
    return (
        <div className={`card-block ${type}`}>
            <ChipLogo/>
            <span className="card-number" style={{color: textColor}}>
                1234 5678 8765 4321
            </span>
            <span className="card-username" style={{color: textColor}}>
                IVANOV IVAN
            </span>
            <img className="card-image"
                src={backgroundImage} 
                alt="Изображение карты" 
            />
            <button className="close-card">
                Блокировать карту
            </button>
        </div>
    );
}