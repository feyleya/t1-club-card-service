import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaAuth } from "../../validation";
import ErrorMessage from "../ui/ErrorMessage";

export default function Authorization() {
    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchemaAuth),
    });

    const { register, formState: { errors, isValid  }} = methods;

    const onSubmit = async (data) => {
        // try {
        //     const response = await axios.post('/api/login', data);

        //     if (response.data.token) {
        //       localStorage.setItem('token', response.data.token);
        //       window.location.href = '/user';
        //     }
        // } catch (error) {
        //     alert('Ошибка при авторизации:', error);
        // }
        console.log(data);
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