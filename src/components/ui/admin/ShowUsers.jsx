import { showUsers } from "../../../additional/requests";
import { useState, useEffect } from "react";
import { UserTable } from "./AntTable";

export default function ShowUsers() {
    const [ users, setUsers ] = useState([]);

    const responseUsers = [
        {id: 1, firstaname: "Ivanov", lastname: "Ivan", middlename: "Ivanovich", cardActive: true, privilegia: "standart"},
        {id: 2, firstaname: "Ivanov", lastname: "Ivan", middlename: "Ivanovich", cardActive: false, privilegia: "advanced"},
        {id: 3, firstaname: "Ivanov", lastname: "Ivan", middlename: "Ivanovich", cardActive: true, privilegia: "vip"},
        { id: 4, firstaname: "Petrov", lastname: "Petr", middlename: "Petrovich", cardActive: true, privilegia: "standart" },
        { id: 5, firstaname: "Sidorov", lastname: "Sergey", middlename: "Sergeevich", cardActive: false, privilegia: "advanced" },
        { id: 6, firstaname: "Smirnov", lastname: "Oleg", middlename: "Olegovich", cardActive: true, privilegia: "vip" },
        { id: 7, firstaname: "Kuznetsov", lastname: "Alexey", middlename: "Alexeevich", cardActive: true, privilegia: "standart" },
        { id: 8, firstaname: "Morozov", lastname: "Vladimir", middlename: "Vladimirovich", cardActive: false, privilegia: "advanced" },
        { id: 9, firstaname: "Nikolaev", lastname: "Ivan", middlename: "Ivanovich", cardActive: true, privilegia: "vip" },
        { id: 10, firstaname: "Fedorov", lastname: "Igor", middlename: "Igorevich", cardActive: false, privilegia: "standart" },
        { id: 11, firstaname: "Orlov", lastname: "Maxim", middlename: "Maximovich", cardActive: true, privilegia: "advanced" },
        { id: 12, firstaname: "Lebedev", lastname: "Roman", middlename: "Romanovich", cardActive: false, privilegia: "vip" },
        { id: 13, firstaname: "Popov", lastname: "Denis", middlename: "Denisovich", cardActive: true, privilegia: "standart" },
        { id: 14, firstaname: "Volkov", lastname: "Mikhail", middlename: "Mikhailovich", cardActive: true, privilegia: "advanced" },
        { id: 15, firstaname: "Soloviev", lastname: "Dmitry", middlename: "Dmitrievich", cardActive: false, privilegia: "vip" },
        { id: 16, firstaname: "Bogdanov", lastname: "Artem", middlename: "Artemovich", cardActive: true, privilegia: "standart" },
        { id: 17, firstaname: "Titov", lastname: "Andrey", middlename: "Andreevich", cardActive: false, privilegia: "advanced" },
        { id: 18, firstaname: "Zaitsev", lastname: "Viktor", middlename: "Viktorovich", cardActive: true, privilegia: "vip" },
        { id: 19, firstaname: "Sokolov", lastname: "Yuri", middlename: "Yurievich", cardActive: true, privilegia: "standart" },
    ]; 

    useEffect(() => {
        if(users.length == 0){
            //const responseUsers = showUsers();
            if(responseUsers.length > 0){
                setUsers(responseUsers);
            }
        }
    }, [])

    return (
        <div className="show-users-block">
            <UserTable initialUsers={responseUsers} />
        </div>
    );
}