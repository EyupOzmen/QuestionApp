import React from "react";
import question from "../data/question.json";

const Survey = () => {
  return (
    <div className="survey-container">
      <div className="survey-header">
        <img src={question.HeaderLogo} alt="Header Logo" />
      </div>
      <br/>
      <div className="survey-question">
      {console.log(question.Questions[0].Question)} 
        <form>
          
          <p style={{color:"black"}} >{question.Questions[0].Question}</p>
          <select
            multiple={false}
            //value={this.state.value}
            //onChange={this.handleChange}
          >
            <option value={question.Questions[0].Options[0].ID}>{question.Questions[0].Options[0].Text}</option>
            <option value={question.Questions[0].Options[1].ID}>{question.Questions[0].Options[1].Text}</option>
            <option value={question.Questions[0].Options[2].ID}>{question.Questions[0].Options[2].Text}</option>
            <option value={question.Questions[0].Options[3].ID}>{question.Questions[0].Options[3].Text}</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
      </div>
      <br/>
      <div className="survey-footer">
        <img src={question.FooterLogo} alt="Header Logo" />
      </div>
    </div>
  );
};

export default Survey;
