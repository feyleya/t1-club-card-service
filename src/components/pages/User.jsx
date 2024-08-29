import Menu from "../ui/Menu";
import QrCode from "../ui/QrCode";
import EditProfile from "../ui/EditProfile";
import Custom from "../ui/custom/Custom";
import CardBlock from "../ui/card/CardBlock";
import { useContext } from "react";
import { AppContext } from "../../additional/context";

export default function User(){
    const { curPage } = useContext(AppContext);
    const pages = ["Карта", "QR-код", "Профиль", "Персонализация"];

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