import React, { useEffect, useState } from "react";
import "./user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
export const User = () => {
  const [user, setUser] = useState([]);
  const [totalTable, setTotalTable] = useState();
  const [currentTable, setCurrentTable] = useState(1);
  useEffect(() => {
    const fetchData = async (url, set) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: "Bearer SomeToken",
          },
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        set(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(`http://localhost:5000/user?table=${currentTable}`, setUser);
    fetchData("http://localhost:5000/user/count-table-client", setTotalTable);
  }, [currentTable]);
  const handePrevTable = () => {
    if (currentTable > 1) {
      setCurrentTable(currentTable - 1);
    }
  };
  const handleNextTable = () => {
    if (currentTable < totalTable) {
      setCurrentTable(currentTable + 1);
    }
  };
  return (
    <div className="user">
      <div className="title">
        <p className="title-content">User</p>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr className="row">
              <th className="coloumn coloumn-id-user">ID User</th>
              <th className="coloumn coloumn-username">Username </th>
              <th className="coloumn coloumn-fullname">Fullname</th>
              <th className="coloumn coloumn-address">Address</th>
              <th className="coloumn coloumn-password">Password</th>
              <th className="coloumn coloumn-email">Email</th>
              <th className="coloumn coloumn-phonenumber">Phone Number</th>
              <th className="coloumn coloumn-acion">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((element, index) => {
              return (
                <tr className="row" key={index}>
                  <td className="coloumn coloumn-id-user">{element._id}</td>
                  <td className="coloumn coloumn-username">
                    {element.username}{" "}
                  </td>
                  <td className="coloumn coloumn-fullname">
                    {element.fullname}
                  </td>
                  <td className="coloumn coloumn-address">{element.address}</td>
                  <td className="coloumn coloumn-password">
                    {element.password}
                  </td>
                  <td className="coloumn coloumn-email">{element.email}</td>
                  <td className="coloumn coloumn-phomenumber">
                    {element.phone_number}
                  </td>
                  <td className="coloumn coloumn-delete">
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-navigator">
          <FontAwesomeIcon
            className="icon"
            icon={faCaretLeft}
            onClick={handePrevTable}
          />
          {currentTable}/{totalTable}
          <FontAwesomeIcon
            className="icon"
            icon={faCaretRight}
            onClick={handleNextTable}
          />
        </div>
      </div>
    </div>
  );
};
