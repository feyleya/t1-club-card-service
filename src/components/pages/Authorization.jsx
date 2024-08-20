import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context";

export default function Authorization() {
    const { phoneNumber, changeField, password } = useContext(AppContext);
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    return (
        <div className="authorization-page-block">
            <h2 className="authorization-page-title">
                Авторизация
            </h2>
            <input 
                name="phone-number"
                type="tel" 
                placeholder="Телефон"
                ref={inputRef}
                value={phoneNumber}
                onChange={(e) => changeField("phoneNumber", e.target.value)}
            />
            <input 
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => changeField("password", e.target.value)} 
            />
            <button href="/registration" className="button filed">
                Войти
            </button>

        </div>
    );
}