import {useEffect, useState  } from "react";
import ErrorMessage from "../other/ErrorMessage";

export default function RegPartOne({ methods, setRegPart }) {
    const { register, setValue, formState: { errors, isValid  } } = methods;
    const [isAdmin, setIsAdmin] = useState(false);
    const [code, setCode] = useState(undefined);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if(searchParams.get("admincode")){
            const decoded = atob(searchParams.get("admincode"));
            if (decoded) {
                setIsAdmin(true);
                const masked = decoded.slice(0, 4) + decoded.slice(4, -4).replace(/./g, "*") + decoded.slice(-4);
                setCode(masked);
                setValue("adminCode", decoded);
            }
        }
    }, []);

    return(
        <>
            <div className="input-block">
                <input {...register("phone")} 
                    placeholder="Телефон*" 
                    className={errors.phone?"error":""}
                />
                <ErrorMessage errors={errors.phone}/>
            </div>

            <div className="input-block">
                <input type="password" {...register("password")} 
                    placeholder="Пароль*" 
                    className={errors.password?"error":""}
                />
                <ErrorMessage errors={errors.password}/>
            </div>

            <div className="input-block">
                <input type="password" {...register("confirmPassword")} 
                    placeholder="Повторите пароль*" 
                    className={errors.confirmPassword?"error":""}
                />
                <ErrorMessage errors={errors.confirmPassword}/>
            </div>

            {isAdmin && (
                <div className="input-block">
                    <input value={code} readOnly/>
                </div>
            )}

            <div className="buttons-block">
                <button 
                    type="button" 
                    onClick={() => setRegPart(2)}
                    disabled={!isValid}
                    className={"button " + (isValid?"filed":"nonactive")}
                >
                Продолжить
                </button>
            </div>
        </>
    )
}