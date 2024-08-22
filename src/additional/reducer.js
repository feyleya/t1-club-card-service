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
        default:
            return state;
    }
}