import axios from '../utils/axios';

const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Get Initial Data
 * @returns
 */
export const getInitialData = () => {
  return axios.all([
    getCategories(),
    getPosts(),
  ]);
}

export const savePost = (post) => {
  post.id = generateUID();
  post.timestamp = Date.now();
  return axios.post('/posts', post);
};

export const deletePost = (id) => {
  return axios.delete(`/posts/${id}`);
};

export const getPost = (id) => {
  return axios.get(`/posts/${id}`);
};

export const getPosts = () => {
  return axios.get('/posts');
};

export const putPost = (post) => {
  return axios.put(`/posts/${post.id}`, post);
};

export const updateRatePost = (id, option) => {
  return axios.post(`/posts/${id}`, {option});
};

export const getPostComments = (id) => {
  return axios.get(`/posts/${id}/comments`);
};

export const getCategories = () => {
  return axios.get('/categories');
};

export const saveComment = (comment) => {
  comment.id = generateUID();
  comment.timestamp = Date.now();
  return axios.post('/comments/', comment);
};

export const putComment = (comment) => {
  return axios.put(`/comments/${comment.id}`, comment);
};

export const updateRateComment = (id, option) => {
  return axios.post(`/comments/${id}`, {option});
};

export const deleteComment = (id) => {
  return axios.delete(`/comments/${id}`);
};