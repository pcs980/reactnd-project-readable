import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Container, Grid, Header, Icon, Label, Menu, Popup, Segment} from 'semantic-ui-react';

import CommentList from '../components/CommentList';
import CustomLabel from '../components/CustomLabel';
import ModalConfirm from '../components/ModalConfirm';
import ResourceNotFoundView from './ResourceNotFoundView';
import Thermometer from '../components/Thermometer';
import {formatDate} from '../utils/format';
import {showEvent} from '../utils/toastEvent';

import {handleDeleteComment, handleRateComment, handleSaveComment, rateComment, removeComment, storeComment} from '../actions/comments';
import {handleRatePost, handleDeletePost, ratePost, removePost, decrementComment, incrementComment} from '../actions/posts';

class PostDetailView extends React.Component {

  state = {
    open: false
  };

  confirmDeletePost = () => {
    this.setState({
      open: true
    });
  };

  closeDeleteConfirm = () => {
    this.setState({
      open: false
    });
  };

  deletePost = (id) => {
    const {dispatch, history, post} = this.props;
    this.closeDeleteConfirm();
    dispatch(handleDeletePost(id))
      .then(() => {
        dispatch(removePost(id));
        history.push(`/${post.category}`);
      })
      .catch(() => {
        showEvent('error', 'The post wasn\'t deleted. Please, try again later.');
      });
  };

  ratePost = (id, option) => {
    this.props.dispatch(handleRatePost(id, option))
      .then(() => {
        this.props.dispatch(ratePost(id, option));
      })
      .catch(() => {
        showEvent('error', 'Your rate wasn\'t saved. Please, try again later.');
      });
  };

  deleteComment = (id) => {
    this.props.dispatch(handleDeleteComment(id))
      .then(({data}) => {
        this.props.dispatch(removeComment(id));
        // Decrement post's comment count
        this.props.dispatch(decrementComment(data.parentId));
      })
      .catch(() => {
        showEvent('error', 'The comment wasn\'t deleted. Please, try again later.');
      });
  };

  updateComment = (comment) => {
    return this.props.dispatch(handleSaveComment(comment))
      .then(({data}) => {
        this.props.dispatch(storeComment(data));
      })
      .catch(() => {
        showEvent('error', 'The comment wasn\'t updated. Please, try again later.');
      });
  }

  saveComment = (comment) => {
    comment.parentId = this.props.post.id;
    return this.props.dispatch(handleSaveComment(comment))
      .then(({data}) => {
        this.props.dispatch(storeComment(data));
        // Increment comment count
        this.props.dispatch(incrementComment(data.parentId));
      })
      .catch(() => {
        showEvent('error', 'The comment wasn\'t saved. Please, try again later.');
      });
  };

  rateComment = (id, option) => {
    this.props.dispatch(handleRateComment(id, option))
      .then(() => {
        this.props.dispatch(rateComment(id, option));
      })
      .catch(() => {
        showEvent('error', 'Your rate wasn\'t saved. Please, try again later.');
      });
  };

  render() {
    const {post, loading} = this.props;
    return (
      <div>
        {
          post
            ? <Container>
              <Menu secondary pointing icon size='small'>
                <Menu.Item header
                  onClick={this.props.history.goBack}>
                  <Icon name='arrow left'/>
                Post detail
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Popup
                    basic
                    content='New'
                    trigger={
                      <Menu.Item as={Link}
                        to='/post'>
                        <Icon name='file'/>
                      </Menu.Item>}/>
                  <Popup
                    basic
                    content='Edit'
                    trigger={
                      <Menu.Item as={Link}
                        to={`/post/${post.id}`}>
                        <Icon name='file alternate'/>
                      </Menu.Item>}/>
                  <Popup
                    basic
                    content='Delete'
                    trigger={
                      <Menu.Item as='a'
                        onClick={this.confirmDeletePost}>
                        <Icon name='trash alternate'/>
                      </Menu.Item>}/>
                  <Popup
                    basic
                    content='Up vote'
                    trigger={
                      <Menu.Item as='a'
                        onClick={() => this.ratePost(post.id, 'upVote')}>
                        <Icon name='thumbs up'/>
                      </Menu.Item>}/>
                  <Popup
                    basic
                    content='Down vote'
                    trigger={
                      <Menu.Item as='a'
                        onClick={() => this.ratePost(post.id, 'downVote')}>
                        <Icon name='thumbs down'/>
                      </Menu.Item>}/>
                </Menu.Menu>
              </Menu>
              <Segment vertical>
                <Grid textAlign='center'>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as='h3' color='teal'>{post.title}</Header>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column textAlign='left' width={4}>
                      <p>{post.body}</p>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <Label.Group circular>
                        <CustomLabel content={post.author} icon='user'/>
                        <CustomLabel content={formatDate(post.timestamp)} icon='calendar alternate outline'/>
                        <CustomLabel content={post.category} icon='archive'/>
                        <CustomLabel content={post.commentCount} icon='comments'/>
                        <Thermometer score={post.voteScore}/>
                      </Label.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <CommentList
                  id={post.id}
                  saveComment={this.saveComment}
                  updateComment={this.updateComment}
                  rateComment={this.rateComment}
                  deleteComment={this.deleteComment}/>
              </Segment>
            </Container>
            : loading !== true && (
              <ResourceNotFoundView />
            )
        }
        <ModalConfirm
          content='This post will be permanently deleted. Are you sure?'
          onConfirm={() => this.deletePost(post.id)}
          onCancel={this.closeDeleteConfirm}
          open={this.state.open}/>
      </div>
    );
  }
}

PostDetailView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object
};

const mapStateToProps = ({comments, posts, loadingBar}, props) => {
  const {postId} = props.match.params;

  // Get post by id from list of posts in store
  posts = Object.values(posts)
    .filter((post) => post.id === postId);

  return {
    comments: Object.values(comments),
    loading: loadingBar.default === 1,
    post: posts.length > 0 ? posts[0] : undefined,
  };
};

export default withRouter(connect(mapStateToProps)(PostDetailView));