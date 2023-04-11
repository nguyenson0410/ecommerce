import React, { useState } from "react";
import "./addnewproduct.css";

export const AddNewProduct = () => {
  const [inputValues, setInPutValue] = useState({
    category: "",
    long_desc: "",
    name: "",
    price: 0,
    short_desc: "",
    short_desc: "",
    quantity: 0,
  });
  const handleChange = (e) => {
    const { name } = e.target;
    const value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setInPutValue({ ...inputValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/product/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    });
  };
  return (
    <div className="addNewProduct">
      <div className="title">
        <p className="title-content">Products/Add New</p>
      </div>
      <div className="content-container">
        <div className="input-form">
          <label>
            Product Name <br />
            <input
              type="text"
              name="name"
              value={inputValues.name}
              placeholder=""
              onChange={handleChange}
              className="product-name"
            />
            <br />
          </label>
          <label>
            Category <br />
            <input
              type="text"
              name="category"
              value={inputValues.category}
              placeholder=""
              onChange={handleChange}
              className="category"
            />
            <br />
          </label>
          <label>
            Short Description <br />
            <input
              type="text"
              name="short_desc"
              value={inputValues.short_desc}
              placeholder=""
              onChange={handleChange}
              className="short-description"
            />
            <br />
          </label>
          <label>
            Long Description <br />
            <input
              type="text"
              name="long_desc"
              value={inputValues.long_desc}
              placeholder=""
              onChange={handleChange}
              className="long-description"
            />
            <br />
          </label>
        </div>
        <div className="submit-form">
          <div className="submit-option">
            <label>
              Price <br />
              <input
                type="number"
                name="price"
                value={inputValues.price}
                placeholder=""
                onChange={handleChange}
                className="price"
              />
              <br />
            </label>
            <label>
              Quantity <br />
              <input
                type="number"
                name="quantity"
                value={inputValues.quantity}
                placeholder=""
                onChange={handleChange}
                className="quantity"
              />
              <br />
            </label>
            <p>Upload image (5 images)</p>
            <button>Choose Files</button>&emsp;
            <p style={{ display: "inline-block" }}>No file chosen</p>
            <br />
            <button onClick={handleSubmit}>Summit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
