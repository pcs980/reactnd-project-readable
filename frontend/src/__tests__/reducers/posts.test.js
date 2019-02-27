import reducer from '../../reducers/posts';
import {posts} from '../../__mocks__/test.helper';
import {
  STORE_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  RATE_POST,
  INCREMENT_COMMENT,
  DECREMENT_COMMENT} from '../../actions/posts';

describe('Post Reducer', () => {
  it('should initial posts state be empty', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should get all posts', () => {
    const action = {
      type: GET_ALL_POSTS,
      posts
    };
    expect(reducer(undefined, action)).toEqual(posts);
  });

  it('should up vote a post', () => {
    const postId = '8xf0y6ziyjabvozdd253nd';
    const action = {
      type: RATE_POST,
      id: postId,
      option: 'upVote'
    };
    const result = reducer(posts, action).filter((post) => post.id === postId);
    expect(result[0]).toHaveProperty('id', postId);
    expect(result[0]).toHaveProperty('voteScore', 7);
    expect.assertions(2);
  });

  it('should down vote a post', () => {
    const postId = '8xf0y6ziyjabvozdd253nd';
    const action = {
      type: RATE_POST,
      id: postId,
      option: 'downVote'
    };
    const result = reducer(posts, action).filter((post) => post.id === postId);
    expect(result[0]).toHaveProperty('id', postId);
    expect(result[0]).toHaveProperty('voteScore', 5);
    expect.assertions(2);
  });

  it ('should mark a post as deleted', () => {
    const postId = '5c9qojr2d1738zlx09afby';
    const action = {
      type: DELETE_POST,
      id: postId
    };
    const result = reducer(posts, action).filter((post) => post.id === postId);
    expect(result[0]).toHaveProperty('id', postId);
    expect(result[0]).toHaveProperty('deleted', true);
    expect.assertions(2);
  });

  it('should store a new post', () => {
    const newPost = {
      id: 'store-post-test',
      title: 'Brand new post',
      author: 'pcs980',
      category: 'redux',
      deleted: false,
      voteScore: 1
    };
    const action = {
      type: STORE_POST,
      post: newPost
    };
    const result = reducer(posts, action).filter((post) => post.id === newPost.id);
    expect(result[0]).toHaveProperty('id', 'store-post-test');
    expect(result[0]).toHaveProperty('title', 'Brand new post');
    expect(result[0]).toHaveProperty('author', 'pcs980');
    expect(result[0]).toHaveProperty('deleted', false);
    expect(result[0]).toHaveProperty('voteScore', 1);
    expect.assertions(5);
  });

  it('should increment comment count', () => {
    const postId = '8xf0y6ziyjabvozdd253nd';
    const action = {
      type: INCREMENT_COMMENT,
      id: '8xf0y6ziyjabvozdd253nd'
    };
    const result = reducer(posts, action).filter((post) => post.id === postId);
    expect(result[0]).toHaveProperty('id', postId);
    expect(result[0]).toHaveProperty('commentCount', 3);
    expect.assertions(2);
  });

  it('should decrement comment count', () => {
    const postId = '8xf0y6ziyjabvozdd253nd';
    const action = {
      type: DECREMENT_COMMENT,
      id: '8xf0y6ziyjabvozdd253nd'
    };
    const result = reducer(posts, action).filter((post) => post.id === postId);
    expect(result[0]).toHaveProperty('id', postId);
    expect(result[0]).toHaveProperty('commentCount', 1);
    expect.assertions(2);
  });
});