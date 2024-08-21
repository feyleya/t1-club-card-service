export default function Header() {
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
                style={{display: "none"}}
            >
                Выход
            </button>
        </header>
    );
}