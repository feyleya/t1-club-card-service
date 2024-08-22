import { useContext } from "react";
import { AppContext } from "../../additional/context";

export default function Header() {
    const { isAuthorized, logout} = useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        window.location.href = '/login';
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
                style={{ display: isAuthorized ? 'block' : 'none' }}
                onClick={handleLogout}
            >
                Выход
            </button>
        </header>
    );
}