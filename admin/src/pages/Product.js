import React, { useEffect, useState } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const Product = () => {
  const [product, setProduct] = useState([]);
  const [totalTable, setTotalTable] = useState();
  const [currentTable, setCurrentTable] = useState(1);
  const [searchString, setSearchString] = useState({ name: "" });

  const fetchData = async (url, set) => {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer SomeToken",
      },
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    set(data);
  };

  useEffect(() => {
    fetchData(
      `http://localhost:5000/product?table=${currentTable}&keyword=${searchString.search}`,
      setProduct
    );
    fetchData(
      "http://localhost:5000/product/count-table-product",
      setTotalTable
    );
  }, [currentTable, searchString]);

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchString({ ...searchString, [name]: value });
  };
  return (
    <div className="product">
      <div className="title">
        <p className="title-content">Products</p>
      </div>
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <input
            type="text"
            name="search"
            value={searchString.search}
            placeholder="Enter Search"
            onChange={handleChange}
          />
        </div>
        <div className="table-toolbar-add">
          <Link to="/add-new-product">
            <button type=""> Add New</button>
          </Link>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr className="row">
              <th className="coloumn coloumn-id-product">ID Product</th>
              <th className="coloumn coloumn-name">Name </th>
              <th className="coloumn coloumn-img">Img</th>
              <th className="coloumn coloumn-category">Category</th>
              <th className="coloumn coloumn-quantity">Quantity</th>
              <th className="coloumn coloumn-price">Price</th>

              <th colSpan="2" className="coloumn coloumn-acion">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((element, index) => {
              return (
                <tr className="row" key={index}>
                  <td className="coloumn coloumn-id-product">{element._id}</td>
                  <td className="coloumn coloumn-name">{element.name} </td>
                  <td className="coloumn coloumn-img">
                    <img src={element.img1} alt="" style={{ height: "50px" }} />
                  </td>
                  <td className="coloumn coloumn-category">
                    {element.category}
                  </td>
                  <td className="coloumn coloumn-quantity">{element.count}</td>
                  <td className="coloumn coloumn-price">{element.price}vnd </td>
                  <td className="coloumn coloumn-delete">
                    <button>Delete</button>
                  </td>
                  <td className="coloumn coloumn-edit">
                    <button>Edit</button>
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
