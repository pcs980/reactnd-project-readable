import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Form, Icon, Label, Menu} from 'semantic-ui-react';

import CommentList from '../components/CommentList';

import {handleSavePost} from '../actions/posts';

class PostDetailView extends React.Component {
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
    titleError: false
  };

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value.trim()
    });
  };

  submitPost = () => {
    const authorError = (this.state.author === '');
    const bodyError = (this.state.body === '');
    const categoryError = (this.state.category === '');
    const titleError = (this.state.title === '');

    if (authorError || bodyError || categoryError || titleError) {
      this.setState({
        authorError,
        bodyError,
        categoryError,
        titleError
      });
    } else {
      const post = {
        author: this.state.author,
        body: this.state.body,
        category: this.state.category.toLowerCase(),
        title: this.state.title
      }
      this.props.dispatch(handleSavePost(post));
    }
  };

  static getDerivedStateFromProps(props, state) {
    const {post} = props;
    if (post) {
      const {author, body, category, commentCount, deleted, id, timestamp, title, voteScore} = post;
      return {
        author,
        body,
        category,
        commentCount,
        deleted,
        id,
        timestamp,
        title,
        voteScore
      };
    }
    return null;
  }

  render() {
    const {action} = this.props;
    const {id, authorError, bodyError, categoryError, titleError} = this.state;
    return (
      <Container>
        <Menu borderless secondary>
          <Menu.Item header as='h3'>{action}</Menu.Item>
          {
            action.startsWith('Edit') && (
              <Menu.Item as={Link} to='/new' position='right'>
                <Icon name='write'/>
                New Post
              </Menu.Item>
            )
          }
        </Menu>
        <Form onSubmit={this.submitPost}>
          <Form.Group widths='equal'>
            <Form.Field width={10}>
              <Form.Input
                name='title'
                label='Title'
                placeholder='Your flashy post title'
                value={this.state.title}
                maxLength={40}
                onChange={this.handleChange}/>
              {
                titleError === true && (
                  <Label pointing basic color='red'>Please enter a title</Label>
                )
              }
            </Form.Field>
            <Form.Field width={4}>
              <Form.Select
                name='category'
                label='Category'
                placeholder='Category'
                value={this.state.category}
                options={this.props.categories}
                onChange={this.handleChange}/>
              {
                categoryError === true && (
                  <Label pointing basic color='red'>Please select a category</Label>
                )
              }
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <Form.TextArea
              name='body'
              label='Post'
              placeholder='Open your hearth and write your post ;)'
              value={this.state.body}
              onChange={this.handleChange}
              maxLength={200}
              rows={4}
              autoHeight/>
            {
              bodyError === true && (
                <Label pointing basic color='red' >Please write a post</Label>
              )
            }
          </Form.Field>
          <Form.Field>
            <Form.Input
              name='author'
              label='Author'
              placeholder='Let us know who you are'
              value={this.state.author}
              onChange={this.handleChange}
              maxLength={20}/>
            {
              authorError === true && (
                <Label pointing basic color='red' >Please tell us your user name</Label>
              )
            }
          </Form.Field>
          <Form.Button>Submit</Form.Button>
        </Form>

        <CommentList id={id}/>
      </Container>
    );
  }
}

const mapStateToProps = ({comments, categories, posts}, props) => {
  console.log('DETAIL VIEW state', {posts});
  console.log('DETAIL VIEW props', {props});
  const {postId} = props.match.params;
  const action = postId ? 'Edit post' : 'New post';

  // Get post by id from list of posts in store
  const post = Object.values(posts)
    .filter((post) => post.id === postId);

  // Remove category 'all' and create list of items for Select component
  const categoriesValues = Object.values(categories)
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
    comments: Object.values(comments),
    post: post.length > 0 ? post[0] : null,
    categories: categoriesValues
  };
}

export default connect(mapStateToProps)(PostDetailView);