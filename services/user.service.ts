import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

const login = (data: any) => {
  return axios.post(`/admin/user/login`, data);
};
const getProfile = () => {
  return axios.get(`/admin/user/profile`);
};
const logout = () => {
  storage.clearToken();
};
export const userService = {
  login,
  logout,
  getProfile
};
