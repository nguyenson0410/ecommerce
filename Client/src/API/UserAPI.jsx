import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/user/client/";
    return axiosClient.get(url, { withCredentials: true });
  },

  getDetailData: (id) => {
    const url = `/user/client/${id}`;
    return axiosClient.get(url, { withCredentials: true });
  },

  postSignUp: (query) => {
    const url = `/user/client/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
