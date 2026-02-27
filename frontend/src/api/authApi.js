import axiosClient from "./apiService";

const authApi = {
    login: (payload) => axiosClient.post("/auth/login", payload),
    register: (payload) => axiosClient.post("/auth/register", payload),
    refresh: () => axiosClient.post("/auth/refresh"),
    logout: () => axiosClient.post("/auth/logout"),
    passwordResetReq: (payload) => axiosClient.post("/auth/pass-reset-req", payload),
    passwordReset: (payload) => axiosClient.post("/auth/pass-reset", payload)
}

export default authApi