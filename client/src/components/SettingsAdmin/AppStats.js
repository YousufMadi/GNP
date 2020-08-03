import "../../stylesheets/settingsAdmin.css";
import React from "react";

const AppStats = () => {
  return (
    <div className="statsContainer">
      <ul className="flexStats">
        <li className="displayStats">
          NUMBER OF ACTIVE USERS <p>200</p>
        </li>
        <li className="displayStats">
          NUMBER OF PEDNING REQUESTS<p>200</p>
        </li>
        <li className="displayStats">
          REQUESTS COMPLETED TODAY <p>10</p>
        </li>
      </ul>
    </div>
  );
};

export default AppStats;
