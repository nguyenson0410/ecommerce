import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postNewOrder: (arg) => {
    const url = "order/create";
    return axiosClient.post(url, arg, { withCredentials: true });
  },
};

export default CheckoutAPI;
