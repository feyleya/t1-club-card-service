import { terms } from "../../additional/constants";
import ErrorMessage from "./ErrorMessage";

export default function RegPartTwo({ methods, setRegPart }) {
    const { register, formState: { errors, isValid } } = methods;
    
    return (
        <>  
            <div className="input-block">
                <input {...register("firstName")} 
                    placeholder="Фамилия*"
                    className={errors.firstName?"error":""}
                />
                <ErrorMessage errors={errors.firstName}/>
            </div>

            <div className="input-block">
                <input {...register("lastName")} 
                    placeholder="Имя*"
                    className={errors.lastName?"error":""}
                />
                <ErrorMessage errors={errors.lastName}/>
            </div>

            <div className="input-block">
                <input {...register("middleName")} 
                    placeholder="Отчество"
                />
                <ErrorMessage errors={errors.middleName}/>
            </div>

            <div className="input-block">
                <input type="email" {...register("email")}
                    placeholder="Электронный адрес"
                    className={errors.email?"error":""}
                />
                <ErrorMessage errors={errors.email}/>
            </div>
            <div className="input-block">
                <div className="birth-gender-block">
                    <span className="birth-block">
                        <label className="date">Дата рождения:</label>
                        <input type="date" {...register("birthDate")}
                            className={errors.birthDate?"error":""}
                        />
                        <ErrorMessage errors={errors.birthDate}/>                    
                    </span>
                    <span className="gender-block">
                        <label>Пол</label>
                        <span>
                            <label>М</label>
                            <input
                            {...register("gender")}
                                type="radio"
                                value="male"
                            />
                        </span>
                        
                        <span>
                            <label>Ж</label>
                            <input
                            {...register("gender")}
                                type="radio"
                                value="female"
                            />
                        </span>
                        
                    </span>
                </div>
            </div>
            

            <div className="terms-block">
                <input type="checkbox" {...register("consent")} 
                    className={errors.consent?"error":""}
                />
                <label className={errors.consent?"error":""}>
                    Я соглашаюсь с <a href={terms} target="_blank" rel="noopener noreferrer" className="text-button">правилами</a> обработки персональных данных
                </label>
            </div>
            <div className="buttons-block">
                <button 
                    onClick={() => setRegPart(1)}
                    className="button unfiled"
                >
                    Назад
                </button>
                <button 
                    type="submit" 
                    disabled={!isValid}
                    className={"button " + (isValid?"filed":"nonactive")}
                >Зарегистрироваться</button>
            </div>
      </>  
    );
}