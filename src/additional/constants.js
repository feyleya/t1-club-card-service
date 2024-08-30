import BA from "../components/ui/card/card_images/black-advanced.jpg"
import BS from "../components/ui/card/card_images/black-standart.jpg"
import BV from "../components/ui/card/card_images/black-vip.jpg"
import BLA from "../components/ui/card/card_images/blue-advanced.jpg"
import BLS from "../components/ui/card/card_images/blue-standart.jpg"
import BLV from "../components/ui/card/card_images/blue-vip.jpg"
import WA from "../components/ui/card/card_images/white-advanced.jpg"
import WS from "../components/ui/card/card_images/white-standart.jpg"
import WV from "../components/ui/card/card_images/white-vip.jpg"

export const images = {
    'black-advanced.jpg': BA,
    'black-standart.jpg': BS,
    'black-vip.jpg': BV,
    'blue-advanced.jpg': BLA,
    'blue-standart.jpg': BLS,
    'blue-vip.jpg': BLV,
    'white-advanced.jpg': WA,
    'white-standart.jpg': WS,
    'white-vip.jpg': WV,
  };


export const terms = "https://www.t1-consulting.ru/privacy_policy.pdf";
export const URL = "http://localhost:8000";

export const apiAuth = "/api/auth";//
export const apiReg = "/api/register"; //
export const apiRegAdmin = "/api/register-admin";//
export const apiCard = "/api/card"; //
export const apiCardBlock = "/api/block-card"; 
export const apiChangeDesign = "/api/card/custom";//
export const apiInviteAdmin = "/api/admin-codes";
export const apiUsers = "/api/show-users";
export const apiEditUser = "/api/user";

export const required = "Заполните обязательное поле";
export const ageText = "Вам должно быть больше 18 лет";
export const ageMinText = "Год рождения должен быть больше 1900";
export const ageMaxText = "Год рождения не должен превышать текущий год";

export const emailText = "Введен недействительный email";
export const phoneText = "Введен недействительный номер телефона";
export const passLenText = "Пароль должен иметь хотя бы 6 символов";
export const passLettersText = "Пароль должен содержать латинские буквы и цифры";
export const passCheckText = "Пароли должны совпадать";
export const consentText = "Необходимо принять правила обработки персональных данных";