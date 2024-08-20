import { useLocation } from "react-router-dom";

export default function RegPartOne() {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
      
        if (searchParams.get("param") === "admicode") {
            setIsAdminCode(true);
        }

        if (inputRef.current) {
        inputRef.current.focus();
        }
    }, []);

    return(
        <div className="registration-part1-block">
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
            {isAdminCode ? (
                <input 
                className={"equal-"+checkPass}
                name="check-password"
                type="password"
                placeholder="Повторите пароль"
                onBlur={(e) => passCheck(e.target.value, password)}
            />
            ) : ""}
        </div>
    )
}