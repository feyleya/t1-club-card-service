import { inviteAdmin } from "../../../additional/requests";
import { useState } from "react";
import { isValidCode } from "../../../additional/validation";

export default function NewAdmin() {
    const [ link, setLink ] = useState("");
    
    const handleClick = () => {
        if(window.confirm("Вы действительно хотите пригласить админинистратора?")){
            const code = inviteAdmin();
            if(isValidCode(code)){
                const link = `${window.location.origin}/registration/?admincode=${btoa(code)}`;
                setLink(link);
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