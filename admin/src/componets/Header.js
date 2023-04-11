import React, { useEffect, useState } from "react";

export const Header = () => {
  const [countClient, setCountClient] = useState();
  const [earning, setEarning] = useState();
  const [order, setOrder] = useState();
  useEffect(() => {
    const fetchData = async (url, set) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        set(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData("http://localhost:5000/user/count-client", setCountClient);
    fetchData("http://localhost:5000/order/earning", setEarning);
    fetchData("http://localhost:5000/order/count-new-order", setOrder);
  }, []);
  return (
    <div className="content-header">
      <div className="content-header-item">
        <p className="content-header-item-number">{countClient}</p>
        <p className="content-header-item-desc ">Client</p>
      </div>
      <div className="content-header-item">
        <p className="content-header-item-number">{earning}vnd</p>
        <p className="content-header-item-desc ">Earning of Month</p>
      </div>
      <div className="content-header-item">
        <p className="content-header-item-number">{order}</p>
        <p className="content-header-item-desc ">New Order</p>
      </div>
    </div>
  );
};
