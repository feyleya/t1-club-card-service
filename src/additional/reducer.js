export function reducer(state, {type, payload}) {
    switch(type){
        case "LOGIN":
            return {
                ...state,
                isAuthorized: true,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthorized: false,
            };
        case "CHANGE_PAGE":
            return {
                ...state,
                curPage: payload.page,
            };
        case "CHANGE_AUTORIZED":
            return{
                ...state,
                isAuthorized: payload.status,
            };
        case "CHANGE_TEMP_STATUS":
            return {
                ...state,
                tempStatus: payload.status,
            };
        case "UPDATE_STATE":
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}