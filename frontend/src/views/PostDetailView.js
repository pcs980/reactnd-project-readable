import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Container, Grid, Header, Icon, Label, Menu, Popup, Segment} from 'semantic-ui-react';

import CommentList from '../components/CommentList';
import CustomLabel from '../components/CustomLabel';
import Thermometer from '../components/Thermometer';
import ResourceNotFoundView from './ResourceNotFoundView';
import {formatDate} from '../utils/format';

import {handleDeleteComment, handleRateComment, handleSaveComment} from '../actions/comments';
import {handleRatePost, incrementComment, decrementComment} from '../actions/posts';

class PostDetailView extends React.Component {

  ratePost = (id, option) => {
    this.props.dispatch(handleRatePost(id, option));
  };

  saveComment = (comment) => {
    comment.parentId = this.props.post.id;
    return this.props.dispatch(handleSaveComment(comment))
      .then(() => {
        // When the comment doesn't have an id, it means that is new
        // and the comment count must be increased
        if (comment.id)
          this.props.dispatch(incrementComment(this.props.post.id));
      });
  };

  updateComment = (comment) => {
    this.props.dispatch(handleSaveComment(comment));
  };

  rateComment = (id, option) => {
    this.props.dispatch(handleRateComment(id, option));
  };

  deleteComment = (id) => {
    this.props.dispatch(handleDeleteComment(id))
      .then(() => this.props.dispatch(decrementComment(this.props.post.id)));
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
                      <Menu.Item as='a'>
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
                        <Thermometer score={post.voteScore}/>
                      </Label.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <CommentList
                  id={post.id}
                  saveComment={this.saveComment}
                  rateComment={this.rateComment}
                  deleteComment={this.deleteComment}/>
              </Segment>
            </Container>
            : loading === true
              ? <div>Loading</div>
              : <ResourceNotFoundView />
        }
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
  const post = Object.values(posts)
    .filter((post) => post.id === postId);

  return {
    comments: Object.values(comments),
    loading: loadingBar.default === 1,
    post: post.length > 0 ? post[0] : undefined,
  };
};

export default withRouter(connect(mapStateToProps)(PostDetailView));