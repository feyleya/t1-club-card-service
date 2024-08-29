import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaPartOne, validationSchemaPartTwo } from "../../additional/validation";
import RegPartOne from "../ui/RegPartOne";
import RegPartTwo from "../ui/RegPartTwo";
import { useAuth } from "../../additional/requests";

export default function Registration() {
    const [regPart, setRegPart] = useState(1);

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(regPart === 1 ? validationSchemaPartOne : validationSchemaPartTwo),
    });

    const { handleReg } = useAuth();

    const onSubmit = (data) => {
        //const newData = new URLSearchParams(Object.entries(data)).toString();
        const newData = JSON.stringify(data, null, 4);
        if(data.adminCode){
            handleReg("/api/register-admin", newData);
        } else{
            handleReg("/api/register", newData);
        }
    };

    return (
        <div className="registration-page-block">
            <h2 className="registration-page-title">
                Регистрация
            </h2>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {(regPart == 1)?(
                    <RegPartOne methods={methods} setRegPart={setRegPart}/>
                ):(
                    <RegPartTwo methods={methods} setRegPart={setRegPart}/>
                )}
            </form>
        </div>
    );
}