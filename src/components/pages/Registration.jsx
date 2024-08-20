import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context";

export default function Registration() {
    const { 
        phoneNumber, 
        changeField, 
        password, 
        passCheck,
        checkPass,
    } = useContext(AppContext);
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const changeRegistration = () => {

    }

    return (
        <div className="registration-page-block">
            <h2 className="registration-page-title">
                Регистрация
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
            <input 
                className={"equal-"+checkPass}
                name="check-password"
                type="password"
                placeholder="Повторите пароль"
                onBlur={(e) => passCheck(e.target.value, password)}
            />

            {/* <input 
                name="lastname"
                type="text" 
                placeholder="Фамилия"
                ref={inputRef}
                value={lastname}
                onChange={(e) => changeField("lastname", e.target.value)}
            /> */}
            <button 
                href="/registration" 
                className={(checkPass)?"button filed":"button nonactive"}
            >
                Зарегистрироваться
            </button>

        </div>
    );
}