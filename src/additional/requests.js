import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './context';

// получение роли пользователя из токена
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role; 
    } catch (e) {
        return null;
    }
};

export const changeStatus = (status) => {
    localStorage.setItem('status', status);
};

export const takeStatus = () => {
    const status = localStorage.getItem('status');
    return status ? parseInt(status, 10) : null;
};

//авторизация пользователя
export const useAuth = () => {
  const { changeTempStatus } = useContext(AppContext);

  const handleAuth = async (url, data) => {
    try {
        if(url && data){
            //const response = await axios.post(url, data);
            //const { token } = response.data;
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI";
            if (token) {
                localStorage.setItem('token', token);
            }
        }

        const role = getUserRole();
        if (role === 'user') {
            await changeTempStatus(92);
        } else {
            if (role === 'admin') {
                await changeTempStatus(93);
            } else {
                await changeTempStatus(94);
            }
        } 

    } catch (error) {
      alert(`Ошибка при выполнении ${url.includes('login') ? 'авторизации' : 'регистрации'}: ${error.message}`);
    }
  };

  return { handleAuth };
};

//проверка при первой загрузке
export const checkAuth = async () => {
    //admin
    // localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI");
    //user
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc");


    const token = localStorage.getItem('token');
    if (!token) {
      return 90; //нет токена
    } else{
        try {
            // const response = await axios.post('/api/check-token', {}, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });

            //nonvalid
            //const response = { data: { isValid: false } };
            //valid
            const response = { data: { isValid: true } };

            const valid = response.data.isValid;
            if(valid === false){
                return 91; //токен невалидный
            } else{
                const role = getUserRole();
                if(role === "user"){
                    return 92; //пользователь
                }
                if(role === "admin"){
                    return 93; //админ
                }
                if(role === "superadmin"){
                    return 94; //суперадмин
                }
            }
        } catch (error) {
            // console.error('Ошибка проверки токена:', error);
            return 89;
        }
    }
  };