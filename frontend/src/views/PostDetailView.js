import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Container, Grid, Header, Icon, Label, Menu, Popup, Segment} from 'semantic-ui-react';

import CommentList from '../components/CommentList';
import Thermometer from '../components/Thermometer';
import CustomLabel from '../components/CustomLabel';
import {formatDate} from '../utils/format';

import {handleDeleteComment, handleRateComment, handleSaveComment} from '../actions/comments';
import {handleRatePost, incrementComment, decrementComment} from '../actions/posts';

class PostDetailView extends React.Component {

  ratePost= (id, option) => {
    this.props.dispatch(handleRatePost(id, option));
  };

  saveComment = (comment) => {
    this.props.dispatch(handleSaveComment(comment))
      .then(() => this.props.dispatch(incrementComment(this.props.post.id)));
  };

  rateComment = (id, option) => {
    this.props.dispatch(handleRateComment(id, option))
  };

  deleteComment = (id) => {
    this.props.dispatch(handleDeleteComment(id))
      .then(() => this.props.dispatch(decrementComment(this.props.post.id)));
  };

  render() {
    const {post} = this.props;
    return (
      <div>
      {
        post
        ? <Container>
            <Menu secondary icon size='small'>
              <Menu.Item header as='h3'>Post detail</Menu.Item>
              <Menu.Menu position='right'>
                <Popup basic trigger={<Menu.Item as={Link} to='/write'>
                    <Icon name='file'/>
                  </Menu.Item>} content='New'/>
                <Popup basic trigger={
                    <Menu.Item as={Link} to={`/write/${post.id}`}>
                      <Icon name='file alternate'/>
                    </Menu.Item>} content='Edit'/>
                <Popup basic trigger={<Menu.Item as='a'>
                    <Icon name='trash alternate'/>
                  </Menu.Item>} content='Delete'/>
                <Popup basic trigger={<Menu.Item as='a'>
                    <Icon name='thumbs up' onClick={() => this.ratePost(post.id, 'upVote')}/>
                  </Menu.Item>} content='Up vote'/>
                <Popup basic trigger={<Menu.Item as='a'>
                    <Icon name='thumbs down' onClick={() => this.ratePost(post.id, 'downVote')}/>
                  </Menu.Item>} content='Down vote'/>
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
        : <p>Post not found</p>
        }
      </div>
    );
  }
}

const mapStateToProps = ({comments, posts}, props) => {
  const {postId} = props.match.params;

  // Get post by id from list of posts in store
  const post = Object.values(posts)
    .filter((post) => post.id === postId);

  return {
    comments: Object.values(comments),
    post: post.length > 0 ? post[0] : null,
  };
}

export default withRouter(connect(mapStateToProps)(PostDetailView));