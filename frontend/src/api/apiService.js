import axios from 'axios'
import authApi from './authApi';

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    // timeout: 15000
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosClient.interceptors.response.use(
    (res) => res, async (error) => {
        const originalRequest = error.config;

        // console.log("Retrying request:", originalRequest.url, "| upload:", originalRequest._isUpload);

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth')){
            originalRequest._retry = true;

            try {
                const res = await authApi.refresh()
                const newAccessToken = res.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);

            } catch (err) {
                localStorage.removeItem("accessToken");
                await authApi.logout()
                return Promise.reject(err)
            }
        }
        return Promise.reject(error);
    }
)

export default axiosClient
