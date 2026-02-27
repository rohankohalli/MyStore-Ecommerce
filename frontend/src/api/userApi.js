import axiosClient from "./apiService";

const userApi = {
    updateUser: (payload, id) => axiosClient.put(`/user/${id}`, payload),
    getUser: () => axiosClient.get("/user/my")
}

export default userApi
