import {comments} from '../../__mocks__/test.helper';
import reducer from '../../reducers/comments';
import {
  DELETE_COMMENT,
  GET_POST_COMMENTS,
  RATE_COMMENT,
  STORE_COMMENT} from '../../actions/comments';

describe('Comment Reducer', () => {
  it('should initial comments state be empty', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should get post\'s comments', () => {
    const action = {
      type: GET_POST_COMMENTS,
      id: '8xf0y6ziyjabvozdd253nd',
      comments
    };
    expect(reducer(undefined, action)).toEqual(comments);
  });

  it('should up vote a comment', () => {
    const commentId = '894tuq4ut84ut8v4t8wun89g';
    const action = {
      type: RATE_COMMENT,
      option: 'upVote',
      id: commentId
    };
    const result = reducer(comments, action).filter((comment) => comment.id === commentId);
    expect(result[0]).toHaveProperty('id', commentId);
    expect(result[0]).toHaveProperty('voteScore', 7);
    expect.assertions(2);
  });

  it('should up vote a comment', () => {
    const commentId = '894tuq4ut84ut8v4t8wun89g';
    const action = {
      type: RATE_COMMENT,
      option: 'downVote',
      id: commentId
    };
    const result = reducer(comments, action).filter((comment) => comment.id === commentId);
    expect(result[0]).toHaveProperty('id', commentId);
    expect(result[0]).toHaveProperty('voteScore', 5);
    expect.assertions(2);
  });

  it('should mark a comment as deleted', () => {
    const commentId = '894tuq4ut84ut8v4t8wun89g';
    const action = {
      type: DELETE_COMMENT,
      id: commentId
    };
    const result = reducer(comments, action).filter((comment) => comment.id === commentId);
    expect(result[0]).toHaveProperty('id', commentId);
    expect(result[0]).toHaveProperty('deleted', true);
    expect.assertions(2);
  });

  it('should store a new comment', () => {
    const newComment = {
      id: 'store-comment-test',
      author: 'pcs980',
      body: 'New comment',
      deleted: false,
      voteScore: 1
    };
    const action = {
      type: STORE_COMMENT,
      comment: newComment
    };
    const result = reducer(comments, action).filter((comment) => comment.id === newComment.id);
    expect(result[0]).toHaveProperty('id', 'store-comment-test');
    expect(result[0]).toHaveProperty('author', 'pcs980');
    expect(result[0]).toHaveProperty('body', 'New comment');
    expect(result[0]).toHaveProperty('deleted', false);
    expect(result[0]).toHaveProperty('voteScore', 1);
    expect.assertions(5);
  });
});