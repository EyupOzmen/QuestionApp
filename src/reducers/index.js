export default (state={},action) => {
    switch (action.type) {
        case "SEND_ANSWERS":
            return{
             ...state,
             answers:[...state.answers,action.payload]
            }
        case "IS_REQUIRED":
            return{
                ...state,
                disableRequired:action.payload
            }    
    
        default:
            return state;
    }
}