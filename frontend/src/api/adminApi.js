import axiosClient from "./apiService";

const adminApi = {
    allUsers: () => axiosClient.get("/admin/users"),
    changeUserRole: (id) => axiosClient.patch(`/admin/${id}/role`),
    changeUserStatus: (id) => axiosClient.patch(`/admin/${id}/status`),
}

export default adminApi