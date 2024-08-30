import { useContext, useEffect } from "react";
import { AppContext } from "../../../additional/context";
import Card from "./Card";
import { useAuth, takeToken } from "../../../additional/requests";

export default function CardBlock(){
    const { userId, cardColor, cardType, updateState, cardActive } = useContext(AppContext);

    const handleBlock = () => {
        console.log("Заглушка");
        // if(cardActive){
        //     var resp = blockCard("block");
        // } else{
        //     var resp = blockCard("unlock");
        // }
        // if(resp){
        //     updateState({ cardActive: !cardActive });
        // }
    }
    
    return (
        <div className={`card-block`}>
            <Card color={cardColor} type={cardType}/>
            <button className="close-card" onClick={handleBlock}>
                {cardActive?"Блокировать карту":"Разблокировать карту"}
            </button>
        </div>
    );
}