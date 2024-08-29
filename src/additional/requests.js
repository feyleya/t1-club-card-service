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

export const takeToken = () => {
    return localStorage.getItem('token');
}

//авторизация пользователя
export const useAuth = () => {
  const { updateState } = useContext(AppContext);

  const handleReg = async (url, data) => {
    try {
        if(url && data){
            const response = await axios.post(url, data);
            if (response.status = 200) {
                alert("Пользователь успешно зарегистрирован");
                const authData = {phone: data.phone, password: data.password}
                const converted = new URLSearchParams(Object.entries(authData)).toString()
                handleAuth("/api/auth", converted);
            } else{
                console.error(`Ошибка: ${response.status} - ${response.statusText}`);
                alert(`Ошибка: ${response.status} - ${response.statusText}`);
            }
        } 
    } catch (error) {
      alert(`Ошибка при выполнении регистрации : ${error.message}`);
    }
  };

  const handleAuth = async (url, data) => {
    try {
        if(url && data){
            const response = await axios.post(url, data);
            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI";
            if (response.status == 200) {
                const { token } = response.access_token;
                if (token) {
                    localStorage.setItem('token', token);
                }
            }
        }

        const role = getUserRole();
        if (role === 'user') {
            await updateState({ tempStatus: 92 });
            updateState({ curPage: "Карта" });
        } else {
            if (role === 'admin') {
                await updateState({ tempStatus: 93 });
            } else {
                await updateState({ tempStatus: 94 });
            }
            updateState({ curPage: "Пользователи" });
        } 

    } catch (error) {
      alert(`Ошибка при выполнении ${url.includes('login') ? 'авторизации' : 'регистрации'}: ${error.message}`);
    }
  };

  const getCard = async (token) => {
    try {
        if(token){
            const response = await axios.post('/api/get-card', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status = 200) {
                console.log("Тут установка данных в контекст");
                //updateState({ userId: user_id});
                // updateState({ cardColor: color });
                // updateState({ cardType: layout });
                // updateState({ privilegia: privilegia});
                // updateState({ cardActive: status });
                // updateState({ cardNumber: card_number });
                // updateState({ userName: firstname });
                // updateState({ userLastname: lastname });
            } else{
                console.error(`Ошибка: ${response.status} - ${response.statusText}`);
                alert(`Ошибка: ${response.status} - ${response.statusText}`);
            }
        } 
    } catch (error) {
      alert(`Ошибка при получении карты : ${error.message}`);
    }
  };

  return { handleAuth, handleReg, getCard };
};

//проверка при первой загрузке
export const checkAuth = async () => {
    //admin
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI");
    //user
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc");
    //superadmin
    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiJ9.gp70_HhHWeFBm5H9GvKSp1J_RY6YzVu7Ypcu6JOCx0A");

    const token = takeToken();
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

export const blockCard = async (value) => {
    const token = takeToken();
    try {
        const response = await axios.post('/api/block-card', {
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

export const setNewDesign = async (color, type) => {
    const token = takeToken();
    const str = `${color}-${type}`;
    try {
        const response = await axios.post('/api/set-design', {
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

export const inviteAdmin = async () => {
    const token = takeToken();
    try {
        const response = await axios.post('/api/invite-admin', {
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(response.data.success){
            return response.data.code;
        }
    } catch (error){
        alert(`Ошибка при добавлении администратора: ${error.message}`);
    }
}

export const showUsers = async (setUsers) => {
    const token = takeToken();
    try {
        const response = await axios.post('/api/show-users', {
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });


        if(response.data.success){
            return response.data.users;
        }
        
    } catch (error){
        alert(`Ошибка при получении пользователей: ${error.message}`);
    }
}

export const editProfile = async (data, id) => {
    const token = takeToken();
    try {
        const response = await axios.post(`/api/user/${id}`, {
            data,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(response.data.success){
            //setUsers(response.data.users);
            console.log(123);
        }
        
    } catch (error){
        alert(`Ошибка при изменении профиля: ${error.message}`);
    }
}

//get-card

//