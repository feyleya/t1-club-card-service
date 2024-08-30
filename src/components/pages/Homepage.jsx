export default function Homepage(){
    return(
        <div className="preview-block">
            <div className="preview-text-block">
                <p className="preview-text">
                    Зарегистрируйтесь в клубной программе T1 и получайте выгоду от всех покупок.
                </p>
                <div className="buttons-block">
                    <a href="/login" className="button unfiled">
                        Войти
                    </a>
                    <a href="/registration" className="button filed">
                        Зарегистрироваться
                    </a>
                </div>
            </div>
            <img 
                src="/cards-preview.png" 
                alt="Превью карт лояльности" 
                className="preview-image" 
            />
        </div>
    );
}