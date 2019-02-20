import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Form, Label, Segment} from 'semantic-ui-react';

class CommentForm extends React.Component {
  state = {
    id: '',
    author: '',
    body: '',
    authorError: false,
    bodyError: false,
    saving: false,
  };

  goBack = () => {
    this.props.history.goBack();
  };

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  submitComment = (event) => {
    event.preventDefault();
    if (this.state.saving === true) return;

    const {author, body} = this.state;
    author.trim();
    body.trim();

    const authorError = author === '';
    const bodyError = body === '';

    if (authorError || bodyError) {
      this.setState({
        authorError,
        bodyError
      });
    } else {
      // Build comment object
      const comment = {
        id: this.state.id,
        author: author,
        body: body
      };
      // Start saving
      this.setState({
        saving: true
      }, () => {
        this.props.saveComment(comment)
          .then(() => {
            // Finish saving and clear state
            this.setState({
              author: '',
              body: '',
              authorError: false,
              bodyError: false,
              saving: false
            });
          });
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id !== prevState.id) {
      if (nextProps.comment) {
        return {
          id: nextProps.comment.id,
          author: nextProps.comment.author,
          body: nextProps.comment.body,
          authorError: false,
          bodyError: false,
        }
      } else {
        return {
          id: undefined,
          author: '',
          body: '',
          authorError: false,
          bodyError: false,
        }
      }
    }
    return null;
  }

  render() {
    const {id, authorError, bodyError} = this.state;

    return (
      <Segment inverted color='teal'>
        <Form reply inverted>
          <Form.Input
            name='body'
            label='Comment'
            placeholder='Comment this post'
            maxLength={60}
            value={this.state.body}
            onChange={this.handleChange}
            error={bodyError === true}/>
          {
            bodyError === true && (
              <Label pointing basic color='red'>Please write a comment</Label>
            )
          }
          <Form.Input
            name='author'
            label='Author'
            placeholder='Let us know who you are'
            value={this.state.author}
            onChange={this.handleChange}
            maxLength={20}
            error={authorError === true}/>
          {
            authorError === true && (
              <Label pointing basic color='red'>Please tell us your user name</Label>
            )
          }
          {
            id && (
              <Button
                icon='arrow left'
                color='grey'
                labelPosition='left'
                size='mini'
                content='Cancel'
                onClick={this.props.cancelEdition}/>
            )
          }
          <Button
            icon='write'
            color='orange'
            labelPosition='left'
            size='mini'
            content='Add comment'
            loading={this.state.saving === true}
            onClick={this.submitComment}/>
        </Form>
      </Segment>
    );
  }
}

CommentForm.propTypes= {
  saveComment: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func.isRequired
}

const mapStateToProps = ({comments}, {saveComment, cancelEdition, id}) => {

  const comment = Object.values(comments)
    .filter((comment) => comment.id === id);

  return {
    id,
    saveComment,
    comment: comment.length > 0 ? comment[0] : undefined
  };
};

export default withRouter(connect(mapStateToProps)(CommentForm));