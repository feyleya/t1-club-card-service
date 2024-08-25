import CustomCard from "./CustomCard";
import { useContext } from "react";
import { AppContext } from "../../../additional/context";

export default function Changer(props) {
    const { newValue, setNewValue, blocks } = props;

    return (
        <div className="change-block">
            {blocks.map((block) => (
                <CustomCard 
                    key={block.id} 
                    color={block.color} 
                    important={block.important} 
                    type={block.type} 
                    newValue={newValue}
                    setNewValue={setNewValue}
                />
            ))}
        </div>
    );
}