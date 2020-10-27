export default (state=[],action) => {
    switch (action.type) {
        case "SEND_ANSWERS":
            return{
            state:action.payload
            }
    
        default:
            return state;
    }
}