import Menu from "../ui/Menu";
import Card from "../ui/card/Card";
import QrCode from "../ui/QrCode";
import EditProfile from "../ui/EditProfile";
import Custom from "../ui/Custom";
import { useContext } from "react";
import { AppContext } from "../../additional/context";

export default function User(){
    const { curPage } = useContext(AppContext);
    return(
        <div className="user-page-block">
            <div className="user-page-content">
                {(() => {
                    switch (curPage) {
                        case "QR-код":
                            return <QrCode />;
                        case "Профиль":
                            return <EditProfile />;
                        case "Персонализация":
                            return <Custom />;
                        default:
                            return <Card />;
                    }
                })()}
                <Menu/>
            </div>
        </div>
    );
}