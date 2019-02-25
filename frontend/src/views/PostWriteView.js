import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Button, Container, Form, Grid, Icon, Label, Menu, Segment} from 'semantic-ui-react';

import {showEvent} from '../utils/toastEvent';

import {handleSavePost, storePost} from '../actions/posts';

class PostWriteView extends React.Component {
  state = {
    author: '',
    body: '',
    category: '',
    commentCount: 0,
    deleted: false,
    id: '',
    timestamp: '',
    title: '',
    voteScore: 1,
    authorError: false,
    bodyError: false,
    categoryError: false,
    titleError: false,
    loaded: false,
    saving: false
  };

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  };

  submitPost = (event) => {
    event.preventDefault();
    const {doStorePost, onSavePost, history} = this.props;
    const {id, author, title, body, category, saving} = this.state;
    if (saving === true) return;

    const authorError = (author.trim() === '');
    const bodyError = (body.trim() === '');
    const categoryError = (category.trim() === '');
    const titleError = (title.trim() === '');

    if (authorError || bodyError || categoryError || titleError) {
      this.setState({
        authorError,
        bodyError,
        categoryError,
        titleError
      });
    } else {
      // Build post object
      const post = {
        id: id,
        author: author,
        body: body,
        category: category.toLowerCase(),
        title: title
      };
      // Start saving
      this.setState({
        saving: true
      }, () => {
        onSavePost(post)
          .then(({data}) => {
            doStorePost(data);
            history.push(`/${category}/${id}`);
          })
          .catch(() => {
            // Finish saving and show error message
            this.setState({
              saving: false
            });
            showEvent('error', 'The post wasn\'t saved. Please, try again later.');
          });
      });
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  // If received post form props, store it in component's state
  static getDerivedStateFromProps(props, state) {
    const {post} = props;
    if (post && state.loaded === false) {
      const {author, body, category, commentCount, id, timestamp, title, voteScore} = post;
      return {
        author,
        body,
        category,
        commentCount,
        id,
        timestamp,
        title,
        voteScore,
        loaded: true
      };
    }
    return null;
  }

  render() {
    const {action} = this.props;
    const {title, author, category, body, authorError, bodyError, categoryError, titleError} = this.state;
    const postSizeLeft = 200 - body.length;

    return (
      <Container>
        <Menu secondary pointing icon size='small'>
          <Menu.Item header
            onClick={this.goBack}>
            <Icon name='arrow left'/>
            {action}
          </Menu.Item>
        </Menu>
        <Segment vertical inverted color='teal'>
          <Grid columns={2} textAlign='center'>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Form onSubmit={this.submitPost} inverted>
                  <Form.Field>
                    {
                      titleError === true && (
                        <Label pointing='below' basic color='red'>Please enter a title</Label>
                      )
                    }
                    <Form.Input
                      name='title'
                      label='Title'
                      placeholder='Your flashy post title'
                      value={title}
                      maxLength={40}
                      onChange={this.handleChange}
                      error={titleError === true}/>
                  </Form.Field>
                  <Form.Field>
                    {
                      categoryError === true && (
                        <Label pointing='below' basic color='red'>Please select a category</Label>
                      )
                    }
                    <Form.Select
                      name='category'
                      label='Category'
                      placeholder='Select a category'
                      value={category}
                      options={this.props.categories}
                      onChange={this.handleChange}
                      error={categoryError === true}/>
                  </Form.Field>
                  <Form.Field>
                    {
                      bodyError === true && (
                        <Label pointing='below' basic color='red'>Please write a post</Label>
                      )
                    }
                    <Form.TextArea
                      name='body'
                      label={`Post (${postSizeLeft} left)`}
                      placeholder='Open your heart and write your post ;)'
                      value={body}
                      onChange={this.handleChange}
                      maxLength={200}
                      error={bodyError === true}/>
                  </Form.Field>
                  <Form.Field>
                    {
                      authorError === true && (
                        <Label pointing='below' basic color='red'>Please tell us your user name</Label>
                      )
                    }
                    <Form.Input
                      name='author'
                      label='Author'
                      placeholder='Let us know who you are'
                      value={author}
                      onChange={this.handleChange}
                      maxLength={20}
                      error={authorError === true}/>
                  </Form.Field>
                  <Button
                    icon='arrow left'
                    color='grey'
                    labelPosition='left'
                    size='mini'
                    content='Cancel'
                    disabled={this.state.saving === true}
                    onClick={this.goBack}/>
                  <Button
                    icon='write'
                    color='orange'
                    labelPosition='left'
                    size='mini'
                    disabled={this.state.saving === true}
                    loading={this.state.saving === true}
                    content='Save'/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

PostWriteView.propTypes = {
  action: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  categories: PropTypes.array,
  post: PropTypes.object,
  onSavePost: PropTypes.func.isRequired,
  doStorePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({categories, posts}, props) => {
  const {postId} = props.match.params;
  const action = postId ? 'Edit post' : 'New post';

  // Get post by id from list of posts in store
  const post = Object.values(posts)
    .filter((post) => post.id === postId);

  // Turn categories into iterable array,
  // remove category 'all'
  // and create list of Select's valid items
  categories = Object.values(categories)
    .filter((category) => category.name !== 'all')
    .map((category) => (
      {
        key: category.name,
        value: category.name,
        text: category.name.toUpperCase()
      }
    ));

  return {
    action,
    categories,
    post: post.length > 0 ? post[0] : null
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    onSavePost: (post) => (
      dispatch(handleSavePost(post))
    ),
    doStorePost: (post) => (
      dispatch(storePost(post))
    )
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostWriteView));