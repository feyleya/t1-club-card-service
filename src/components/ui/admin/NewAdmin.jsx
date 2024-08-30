import { inviteAdmin } from "../../../additional/requests";
import { useState } from "react";

export default function NewAdmin() {
    const [ link, setLink ] = useState("");
    
    const handleClick = async () => {
        if(window.confirm("Вы действительно хотите пригласить админинистратора?")){
            try {
                const response = await inviteAdmin(); 
                if (response && response.data) {
                    const code = response.data; 
                    console.log(code);
    
                    const link = `${window.location.origin}/registration/?admincode=${btoa(code)}`;
                    setLink(link); 
                } else {
                    alert("Не удалось получить adminCode.");
                }
            } catch (error) {
                alert(`Ошибка при обработке adminCode: ${error.message}`);
            }
        }
    }

    const handleDelete = () => {
        if(window.confirm("Вы действительно хотите удалить ссылку?")){
            setLink("");
        }
    }
    
    return (
        <div className="new-admin-block">
                <button className="button unfiled" onClick={handleClick}>
                    Пригласить администратора
                </button>
                {(link !== "")?(
                    <div className="admin-input-block">
                        <input type="text" value={link} readOnly/>
                        <img src="/copy-icon.png" 
                        alt="Копировать" 
                        onClick={() => {
                            navigator.clipboard.writeText(link)
                            .then(() => alert('Ссылка скопирована в буфер обмена'));
                        }}
                        />
                        <img src="/delete-icon.png" 
                        alt="удалить" 
                        onClick={handleDelete}
                        />
                    </div>
                ):""}
        </div>
    );
}