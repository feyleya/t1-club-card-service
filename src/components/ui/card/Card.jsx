import ChipLogo from "./ChipLogo";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";
import { images } from "../../../additional/constants";
  

export default function Card(props){
    const { color, type } = props;
    const { privilegia, cardNumber, userLastname, userName } = useContext(AppContext);
    console.log(color, type);
    
    const textColor = (color === "white"?"var(--blue)":"white");
    const imageKey = `${color}-${privilegia}.jpg`;

    const backgroundImage = images[imageKey];
    
    return (
        <div className={`card-item ${type}`}>
            <ChipLogo color={color}/>
            <span className="card-number" style={{color: textColor}}>
                {cardNumber}
            </span>
            <span className="card-username" style={{color: textColor}}>
                {`${userName} ${userLastname}`}
            </span>
            <img className="card-image"
                src={backgroundImage} 
                alt="Изображение карты" 
            />
        </div>
    );
}