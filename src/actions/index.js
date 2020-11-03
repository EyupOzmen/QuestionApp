export function sendAnswers (options){
    return{
        type:"SEND_ANSWERS",
        payload:options
    }
};

// export function sendCurrentAnswer (answer){
//     return{
//         type:"SEND_CURRENT_ANSWER",
//         payload:answer
//     }
// }

export function validateRequired(ableNext){
    return{
        type:"IS_REQUIRED",
        payload:ableNext
    }
}

export function isQuestionRequired(isRequired){
    return{
        type:"IS_QUESTION_REQUIRED",
        payload:isRequired
    }
} 