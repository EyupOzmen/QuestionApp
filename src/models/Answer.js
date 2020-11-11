export default class Answer{
    ID;
    Value;
    Text;
    QuestionType;
    
    constructor(data){
        Object.assign(this,data);
    }

}