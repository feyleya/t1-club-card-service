import ChipLogo from "../card/ChipLogo";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";
import { images } from "../../../additional/constants";

export default function CustomCard(props){
    const { color, type, newValue, setNewValue, important } = props;
    const { privilegia} = useContext(AppContext);
    
    const textColor = (color === "white"?"var(--blue)":"white");
    const imageKey = `${color}-${privilegia}.jpg`;
    const backgroundImage = images[imageKey];

    const temp = important === "color" ? color : type;
    const isSelected = newValue === temp;
    
    return (
        <div className={`card-item ${type} ${isSelected ? 'selected' : ''}`} onClick={() => setNewValue(temp)}>
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