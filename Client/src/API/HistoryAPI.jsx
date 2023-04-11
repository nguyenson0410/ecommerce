import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `/order/client/history${query}`;
    return axiosClient.get(url, { withCredentials: true });
  },

  getDetail: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url, { withCredentials: true });
  },
};

export default HistoryAPI;
