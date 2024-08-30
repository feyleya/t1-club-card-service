import Menu from "../ui/menu/Menu";
import QrCode from "../ui/qr/QrCode";
import EditProfile from "../ui/edit_profile/EditProfile";
import Custom from "../ui/custom/Custom";
import CardBlock from "../ui/card/CardBlock";
import { useContext, useEffect } from "react";
import { AppContext } from "../../additional/context";
import { useAuth } from "../../additional/requests";

export default function User(){
    const { curPage, privilegia, cardActive, userId} = useContext(AppContext);
    const pages = ["Карта", "QR-код", "Профиль", (privilegia!=="standart" && cardActive)?"Персонализация":""];

    return(
        <div className="user-page-block">
            {(() => {
                switch (curPage) {
                    case "QR-код":
                        return <QrCode />;
                    case "Профиль":
                        return <EditProfile />;
                    case "Персонализация":
                        return <Custom />;
                    default:
                        return <CardBlock/>;
                }
            })()}
            <Menu pages={pages}/>
        </div>
    );
}