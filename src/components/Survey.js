import React,{useState} from "react";
import question from "../data/question.json";

const Survey = () => {
 
  const [selected,setSelected] = useState('')  

  const handleChange = ( event ) => {
      setSelected(event.target.value);
  }

  const handleSubmit = ( event ) => {
      event.preventDefault();

      alert(`Tuttuğunuz takım: ${selected}`);
  }
 
  return (
    <div className="survey-container">
      <div className="survey-header">
        <img src={question.HeaderLogo} alt="Header Logo" />
      </div>
      <br/>
      <div className="survey-question">
      {console.log(question.Questions[0].Question)} 
      <form onSubmit={handleSubmit}>
      <p>{question.Questions[0].Question}</p>
      
      <ul style={{listStyleType:"none"}} >
        <li>
          <label>
            <input
              type="radio"
              value={question.Questions[0].Options[0].Text}
              checked={selected === question.Questions[0].Options[0].Text}
              onChange={handleChange}
            />
            {question.Questions[0].Options[0].Text}
          </label>
        </li>
        
        <li>
          <label>
            <input
              type="radio"
              value={question.Questions[0].Options[1].Text}
              checked={selected === question.Questions[0].Options[1].Text}
              onChange={handleChange}
            />
            {question.Questions[0].Options[1].Text}
          </label>
        </li>

        <li>
          <label>
            <input
              type="radio"
              value={question.Questions[0].Options[2].Text}
              checked={selected === question.Questions[0].Options[2].Text }
              onChange={handleChange}
            />
            {question.Questions[0].Options[2].Text}
          </label>
        </li>

        <li>
          <label>
            <input
              type="radio"
              value={question.Questions[0].Options[3].Text}
              checked={selected === question.Questions[0].Options[3].Text }
              onChange={handleChange}
            />
            {question.Questions[0].Options[3].Text}
          </label>
        </li>
      </ul>

      <button type="submit">Cevapla</button>
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
