import { useContext } from "react";
import { AppContext } from "../../additional/context";
import { logout } from "../../additional/requests";

export default function Header() {
    const { tempStatus, changeTempStatus} = useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header>
            <a href="/" className="header-logo-button">
                <img 
                    src="/main-logo.png" 
                    alt="Логотип T1 клуба" 
                    className="header-logo"
                />
            </a>
            <button 
                className="text-button"
                style={{ display: (tempStatus > 91)?'block' : 'none' }}
                onClick={handleLogout}
            >
                Выход
            </button>
        </header>
    );
}