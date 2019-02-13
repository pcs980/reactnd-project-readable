import axios from '../utils/axios';

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

export const postPost = (post) => {
  return axios.post('/posts', {post});
};

export const deletePost = (id) => {
  return axios.delete('/posts/:id', id);
};

export const getPost = (id) => {
  return axios.get('/posts/:id', id);
};

export const getPosts = () => {
  return axios.get('/posts');
};

export const getPostComments = (id) => {
  return axios.get('/posts/:id/comments', id);
};

export const getCategories = () => {
  return axios.get('/categories');
}

export const getComment = (id) => {
  return axios.get('/comments/:id', id);
}
