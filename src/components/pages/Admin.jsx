import { useState } from "react";
import { takeStatus } from "../../additional/requests";

import NewAdmin from "../ui/admin/NewAdmin";
import ShowUsers from "../ui/admin/ShowUsers";
import { useContext } from "react";
import { AppContext } from "../../additional/context";
import EditProfile from "../ui/edit_profile/EditProfile";
import Menu from "../ui/menu/Menu";

export default function Admin(){
    const { curPage } = useContext(AppContext);

    const pages = ["Пользователи", "Редактировать профиль", (takeStatus() == 94)?"Пригласить администратора":""];

    return(
        <div className="admin-page-block">
            {(() => {
                switch (curPage) {
                    case "Пригласить администратора":
                        return <NewAdmin/>;
                    case "Редактировать профиль":
                        return <EditProfile />;
                    default:
                        return <ShowUsers/>;
                }
            })()}
            <Menu pages={pages}/>
        </div>
    );
}