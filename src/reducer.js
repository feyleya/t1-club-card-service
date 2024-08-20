export function reducer(state, {type, payload}) {
    switch(type){
        case "SET_ITEMS":
            return {
                ...state,
                items: payload || [],
                loading: false,
            };
        case "CHANGE_FIELD":
            return {
                ...state,
                [payload.field]: payload.value,
            };
        case "CHECK_PASSWORD":
            return {
                ...state,
                checkPass: (payload.oldvalue == payload.newvalue),
            };
        default:
            return state;
    }
}