import axiosClient from './axiosClient';

const todoApi = {
  getAll: (params) => {
    return axiosClient.get('/', { params });
  },
  create: (title) => {
    return axiosClient.post('/', { title });
  },
  update: (id, data) => {
    return axiosClient.put(`/${id}`, data);
  },
  delete: (id) => {
    return axiosClient.delete(`/${id}`);
  }
};

export default todoApi;
