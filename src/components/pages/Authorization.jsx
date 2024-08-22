import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaAuth } from "../../additional/validation";
import ErrorMessage from "../ui/ErrorMessage";
import { useAuth } from "../../additional/requests";

export default function Authorization() {
    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchemaAuth),
    });

    const { register, formState: { errors, isValid  }} = methods;

    const { handleAuth } = useAuth();

    const onSubmit = (data) => {
        handleAuth('/api/login', data);
    };

    return (
        <div className="authorization-page-block">
            <h2 className="authorization-page-title">
                Авторизация
            </h2>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                <div className="buttons-block">
                    <button 
                        type="submit" 
                        disabled={!isValid}
                        className={"button " + (isValid?"filed":"nonactive")}
                    >Войти</button>
                </div>
            </form>


        </div>
    );
}