export default class Question{
    ID;
    QuestionType;
    Question;
    isRequired;
    Options=[];

    constructor(data){
        Object.assign(this,data);
    }
    
}


