import React from "react";
import LanguageSelector from "./LanguageSelector";

const WelcomeView = ({ welcomeText }) => {
  return (
    <div>
      <div>
        <h3>{welcomeText}</h3>
      </div>
      <div>
        <h6>
          <LanguageSelector />
        </h6>
      </div>
    </div>
  );
};

export default WelcomeView;
