import React from "react";

const ViewUsers = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yousuf Madi</td>
            <td>yousuf.madi@mail.utoronto.ca</td>
            <td>5</td>
            <td>
              <button className="deleteButton">x</button>
            </td>
          </tr>
          <tr>
            <td>Ayub Hassan</td>
            <td>ayub.hassan@mail.utoronto.ca</td>
            <td>5</td>
            <td>
              <button className="deleteButton">x</button>
            </td>
          </tr>
          <tr>
            <td>Anirudha Kanodia</td>
            <td>anirudha.kanodia@mail.utoronto.ca</td>
            <td>5</td>
            <td>
              <button className="deleteButton">x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
