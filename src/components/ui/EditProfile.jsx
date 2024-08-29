import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaPartThree } from "../../additional/validation";
import ErrorMessage from "./ErrorMessage";
import { useContext } from "react";
import { AppContext } from "../../additional/context";
import { editProfile } from "../../additional/requests";

export default function EditProfile() {
    const { userName,
        userLastname,
        userMiddlename,
        userEmail,
        userBirth,
        userGender,
        userId,
    } = useContext(AppContext);

    const defaultValues = {
        firstName: userName,
        lastName: userLastname,
        middleName: userMiddlename,
        email: userEmail,
        birthDate: userBirth,
        gender: userGender,
    }

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isValid },
    } = useForm({mode: "onBlur", resolver: yupResolver(validationSchemaPartThree), defaultValues});

    const onSubmit = (data) => {
        editProfile(data, userId);
    };

    return (
        <div className="editprofile-block">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-block">
                    <input 
                        {...register("firstName")} 
                        placeholder="Фамилия*"
                        className={errors.firstName ? "error" : ""}
                    />
                    <ErrorMessage name="firstName" errors={errors.firstName} />
                </div>

                <div className="input-block">
                    <input 
                        {...register("lastName")} 
                        placeholder="Имя*"
                        className={errors.lastName ? "error" : ""}
                    />
                    <ErrorMessage name="lastName" errors={errors.lastName} />
                </div>

                <div className="input-block">
                    <input 
                        {...register("middleName")} 
                        placeholder="Отчество"
                    />
                </div>

                <div className="input-block">
                    <input 
                        type="email" 
                        {...register("email")}
                        placeholder="Электронный адрес"
                        className={errors.email ? "error" : ""}
                    />
                    <ErrorMessage name="email" errors={errors.email} />
                </div>

                <div className="input-block">
                    <div className="birth-gender-block">
                        <span className="birth-block">
                            <label className="date">Дата рождения:</label>
                            <Controller
                                name="birthDate"
                                control={control}
                                render={({ field }) => (
                                    <input 
                                        type="date" 
                                        {...field}
                                        className={errors.birthDate ? "error" : ""}
                                    />
                                )}
                            />
                            <ErrorMessage name="birthDate" errors={errors.birthDate} />
                        </span>
                        <span className="gender-block">
                            <label>Пол</label>
                            <span>
                                <label>М</label>
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="M"
                                />
                            </span>

                            <span>
                                <label>Ж</label>
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="F"
                                />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="buttons-block">
                    <button 
                        type="submit" 
                        disabled={!isValid}
                        className={"button " + (isValid ? "filed" : "nonactive")}
                    >
                        Сохранить изменения
                    </button>
                </div>
            </form>
        </div>
    );
}