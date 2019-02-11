import axios from 'axios';

const url = 'http://localhost:3001';

export const savePost = (post) => {
  return axios.post(`${url}/posts`, {post});
};

export const getPost = (id) => {
  return axios.get(`${url}/posts/:id`, id);
};

export const getAllPosts = () => {
  return axios.get(`${url}/posts`);
};
