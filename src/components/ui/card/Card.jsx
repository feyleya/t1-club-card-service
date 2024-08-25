import ChipLogo from "./ChipLogo";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";

const images = require.context('../../../card_images', false, /\.(jpg|jpeg|png)$/);

export default function Card(props){
    const { color, type } = props;
    const { privilegia} = useContext(AppContext);
    
    const textColor = (color === "white"?"var(--blue)":"white");
    const backgroundImage = images(`./${color}-${privilegia}.jpg`);
    
    return (
        <div className={`card-item ${type}`}>
            <ChipLogo color={color}/>
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
        </div>
    );
}