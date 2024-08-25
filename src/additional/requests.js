import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './context';
import { jwtDecode } from 'jwt-decode';

// получение роли пользователя из токена
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = jwtDecode(token);
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
  const { updateState } = useContext(AppContext);

  const handleAuth = async (url, data) => {
    try {
        if(url && data){
            //const response = await axios.post(url, data);
            //const { token } = response.data;
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI";
            if (token) {
                localStorage.setItem('token', token);
                // const decoded = jwtDecode(token);

                // updateState({ cardColor: decoded.style.split("-")[0] });
                // updateState({ cardType: decoded.style.split("-")[1] });
                // updateState({ privilegia: decoded.privilegia});
                // updateState({ cardActive: decoded.active });
                // updateState({ cardNumber: decoded.cardnumber });
                // updateState({ userName: decoded.name });
                // updateState({ userLastname: decoded.lastname });

            }
        }

        const role = getUserRole();
        if (role === 'user') {
            await updateState({ tempStatus: 92 });
        } else {
            if (role === 'admin') {
                await updateState({ tempStatus: 93 });
            } else {
                await updateState({ tempStatus: 94 });
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
                return 91;
            } else{
                const role = getUserRole();
                if(role === "user"){
                    return 92;
                }
                if(role === "admin"){
                    return 93;
                }
                if(role === "superadmin"){
                    return 94; 
                }
            }
        } catch (error) {
            return 89;
        }
    }
};

export const blockCard = (value) => {
    const token = localStorage.getItem('token');
    try {
        const response = axios.post('/api/block-card', {
            status: value,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(response.data.success){
            return true;
        }
    } catch (error){
        alert(`Ошибка при блокировании карты: ${error.message}`);
    }
}

export const setNewDesign = (color, type) => {
    const token = localStorage.getItem('token');
    const str = `${color}-${type}`;
    try {
        const response = axios.post('/api/set-design', {
            value: str,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(response.data.success){
            return true;
        }
    } catch (error){
        alert(`Ошибка при выборе дизайна: ${error.message}`);
    }
}