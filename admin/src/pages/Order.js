import React, { useEffect, useState } from "react";
import "./order.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
export const Order = () => {
  const [order, setOrder] = useState([]);
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

    fetchData(
      `http://localhost:5000/order/all?table=${currentTable}`,
      setOrder
    );
    fetchData(" http://localhost:5000/order/count-table-order", setTotalTable);
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
    <div className="order">
      <div className="title">
        <p className="title-content">Order</p>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr className="row">
              <th className="coloumn coloumn-id-user">ID User</th>
              <th className="coloumn coloumn-name">Name </th>
              <th className="coloumn coloumn-phone">Phone</th>
              <th className="coloumn coloumn-adress">Adress</th>
              <th className="coloumn coloumn-total">Total</th>
              <th className="coloumn coloumn-delivery">Delivery</th>
              <th className="coloumn coloumn-status">Status</th>
              <th className="coloumn coloumn-acion">Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((element, index) => {
              return (
                <tr className="row" key={index}>
                  <td className="coloumn coloumn-id-user">
                    {element.user_id._id}
                  </td>
                  <td className="coloumn coloumn-name">
                    {element.user_id.username}{" "}
                  </td>
                  <td className="coloumn coloumn-phone">
                    {element.user_id.phone_number}
                  </td>
                  <td className="coloumn coloumn-adress">
                    {element.user_id.address}
                  </td>
                  <td className="coloumn coloumn-total">{element.total}</td>
                  <td className="coloumn coloumn-delivery">
                    {element.delivery}
                  </td>
                  <td className="coloumn coloumn-status">{element.status}</td>
                  <td className="coloumn coloumn-view">
                    <button>View</button>
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
