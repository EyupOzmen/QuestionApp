export default (state = {}, action) => {
  switch (action.type) {
    case "SEND_ANSWERS":
      if (action.payload.QuestionType === "MultiSingle") {
        console.log(action.payload.ID)
        let newArrSingle = state.answers.filter((question) => question.ID  !== action.payload.ID)
        return { ...state, answers: [...newArrSingle,action.payload] };
       
      } else if (action.payload[0].QuestionType === "MultiMulti") {
        console.log(action.payload[action.payload.length-1])
        console.log('Before Filter',state.answers);
        let newArrMulti = state.answers.filter((question) => question.ID  !== action.payload[action.payload.length-1].ID);
        console.log("After Filtered", newArrMulti);
        return { ...state, answers: [...newArrMulti,...action.payload] };
      }
       else {
        {console.log(action.payload)}
        console.log('Else')
        return {
          ...state,
          answers: [...state.answers, ...action.payload],
        };
      }

    case "IS_REQUIRED":
      return {
        ...state,
        disableRequired: action.payload,
      };
    case "IS_QUESTION_REQUIRED":
      return {
        ...state,
        isQRequired: action.payload,
      };

    default:
      return state;
  }
};
