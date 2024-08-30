import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './context';
import { jwtDecode } from 'jwt-decode';
import qs from 'qs'
import { URL, apiAuth, apiInviteAdmin, apiChangeDesign, apiCard, apiCardBlock, apiUsers, apiEditUser } from './constants';

export const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

// получение роли пользователя из токена
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = jwtDecode(token);
        return payload.realm_access.roles[3]; 
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
  const { updateState, userId } = useContext(AppContext);

  const handleReg = async (url, data) => {
    try {
        if(url && data){
            const newData = JSON.stringify(data, null, 2);
            const response = await axios.post(`${URL}${url}`, newData, { headers: {'Content-Type' : 'application/json'}});
            if (response.status = 200) {
                alert("Успешно зарегистрирован");
                const authData = {phone: data.phone, password: data.password}
                handleAuth(authData);
            } else{
                console.error(`Ошибка: ${response.status} - ${response.statusText}`);
                alert(`Ошибка: ${response.status} - ${response.statusText}`);
            }
        } 
    } catch (error) {
      alert(`Ошибка при выполнении регистрации : ${error.message}`);
    }
  };

  const getCard = async (id) => {
    const token = takeToken();
    try {
        if(token){
            const response = await axios.get(`${URL}${apiCard}/${id}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                updateState({ cardColor: response.data.color });
                updateState({ cardType: response.data.layout });
                updateState({ privilegia: response.data.privilegeLevel.toLowerCase()});
                updateState({ cardActive: response.data.used });
                updateState({ cardNumber: response.data.cardNumber });
                updateState({ userName: response.data.firstname });
                updateState({ userLastname: response.data.lastname });
            } else{
                console.error(`Ошибка: ${response.status} - ${response.statusText}`);
                alert(`Ошибка: ${response.status} - ${response.statusText}`);
            }
        } 
    } catch (error) {
      alert(`Ошибка при получении карты : ${error.message}`);
    }
  };

  const handleAuth = async (data) => {
    try {
        if(data){
            const response = await axios.post(`${URL}${apiAuth}`, qs.stringify(data), { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}});
            if (response.status == 200) {
                updateState({ userId:  response.data.userId});
                const token = response.data.access_token;
                if (token) {
                    localStorage.setItem('token', token);
                    const role = getUserRole();

                    if (role === 'user') {
                        await updateState({ status: 92 });
                        updateState({ curPage: "Карта" });
                        getCard(response.data.userId);
                    } else {
                        if (role === 'admin') {
                            await updateState({ status: 93 });
                        } else {
                            await updateState({ status: 94 });
                        }
                        updateState({ curPage: "Пользователи" });
                    }
                }
            }
        }
    } catch (error) {
      alert(`Ошибка при выполнении авторизации : ${error.message}`);
    }
  };

  return { handleAuth, handleReg, getCard };
};

//проверка при первой загрузке
// export const checkAuth = async () => {
//     //admin
//     //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI");
//     //user
//     //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc");
//     //superadmin
//     //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiJ9.gp70_HhHWeFBm5H9GvKSp1J_RY6YzVu7Ypcu6JOCx0A");

//     const token = takeToken();
//     if (!token) {
//       return 90; //нет токена
//     } else{
//         try {
//             // const response = await axios.post('/api/check-token', {}, {
//             //     headers: { Authorization: `Bearer ${token}` }
//             // });

//             //nonvalid
//             //const response = { data: { isValid: false } };
//             //valid
//             const response = { data: { isValid: true } };

//             const valid = response.data.isValid;
//             if(valid === false){
//                 return 91;
//             } else{
//                 const role = getUserRole();
//                 if(role === "user"){
//                     return 92;
//                 }
//                 if(role === "admin"){
//                     return 93;
//                 }
//                 if(role === "superadmin"){
//                     return 94; 
//                 }
//             }
//         } catch (error) {
//             return 89;
//         }
//     }
// };

export const blockCard = async (value) => {
    const token = takeToken();
    try {
        const response = await axios.post(`${URL}${apiCardBlock}`, {
            status: value,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status == 200) {
            return true;
        }
    } catch (error){
        alert(`Ошибка при блокировании карты: ${error.message}`);
    }
}

export const setNewDesign = async (color, type, id) => {
    const token = takeToken();
    const json = {
        color: color,
        type: type
    };
    try {
        const response = await axios.patch(`${URL}${apiChangeDesign}/${id}`, json, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status == 200) {
            return true;
        }
    } catch (error){
        alert(`Ошибка при выборе дизайна: ${error.message}`);
    }
}

export const inviteAdmin = async () => {
    const token = takeToken();
    try {
        const response = await axios.post(`${URL}${apiInviteAdmin}`, {
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status == 200) {
            return response;
        }
    } catch (error){
        alert(`Ошибка при добавлении администратора: ${error.message}`);
    }
}

export const showUsers = async () => {
    const token = takeToken();
    try {
        const response = await axios.post(`${URL}${apiUsers}`, {
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });


        if (response.status == 200) {
            return response.data.users;
        }
        
    } catch (error){
        alert(`Ошибка при получении пользователей: ${error.message}`);
    }
}

export const editProfile = async (data, id) => {
    const token = takeToken();
    try {
        const response = await axios.post(`${URL}${apiEditUser}/${id}`, {
            data,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status == 200) {
            //setUsers(response.data.users);
            console.log(123);
        }
        
    } catch (error){
        alert(`Ошибка при изменении профиля: ${error.message}`);
    }
}

//get-card

//