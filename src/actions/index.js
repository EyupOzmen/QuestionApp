export function sendAnswers (options){
    return{
        type:"SEND_ANSWERS",
        payload:options
    }
};

export function validateRequired(ableNext){
    return{
        type:"IS_REQUIRED",
        payload:ableNext
    }
}