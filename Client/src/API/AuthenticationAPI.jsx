import axiosClient from "./axiosClient";

const AuthenticationAPI = {
  getSignIn: (arg) => {
    const url = "/auth/signin";
    return axiosClient.post(url, arg, { withCredentials: true });
  },
};

export default AuthenticationAPI;
