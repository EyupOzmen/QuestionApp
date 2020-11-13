import questionTurkish from "../data/questionTurkish.json";
import questionEnglish from "../data/questionEnglish.json";

import  Survey  from "../models/Survey";

export function sendAnswers(options) {
  return {
    type: "SEND_ANSWERS",
    payload: options,
  };
}

export function validateRequired(ableNext) {
  return {
    type: "IS_REQUIRED",
    payload: ableNext,
  };
}

export function isQuestionRequired(isRequired) {
  return {
    type: "IS_QUESTION_REQUIRED",
    payload: isRequired,
  };
}

export const fetchSurvey =  (language) => async dispatch =>{
  switch (language) {
    case "TÜRKÇE":
      const dataTurkish =  new Survey(questionTurkish);
      dispatch( {
        type: "FETCH_SURVEY",
        payload: dataTurkish,
      });
      break;
    case "ENGLISH":
      const dataEnglish = new Survey(questionEnglish);
      dispatch( {
        type: "FETCH_SURVEY",
        payload: dataEnglish,
      });
      break;
  }
};
