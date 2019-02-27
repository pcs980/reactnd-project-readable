import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Form, Label, Segment} from 'semantic-ui-react';

export class CommentForm extends React.Component {
  state = {
    id: undefined,
    author: '',
    body: '',
    authorError: false,
    bodyError: false,
    saved: false,
    saving: false,
  };

  goBack = () => {
    this.props.history.goBack();
  };

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  };

  submitComment = (event) => {
    event.preventDefault();
    if (this.state.saving === true) return;

    let {id, author, body} = this.state;
    author = author.trim();
    body = body.trim();

    const authorError = author === '';
    const bodyError = body === '';

    if (authorError === true || bodyError === true) {
      this.setState({
        authorError,
        bodyError
      });
    } else {
      // Build comment object
      const comment = {
        id: id,
        author: author,
        body: body
      };
      // Start saving
      this.setState({
        saving: true
      }, () => {
        if (id) {
          this.props.updateComment(comment)
            .then(() => {
              // Finish saving and clear state
              this.setState(this.clearState(true, false));
            });
        } else {
          this.props.saveComment(comment)
            .then(() => {
              // Finish saving and clear state
              this.setState(this.clearState(true, false));
            });
        }
      });
    }
  };

  clearState = (saved, saving) => (
    {
      id: '',
      author: '',
      body: '',
      authorError: false,
      bodyError: false,
      saved: saved,
      saving: saving
    }
  );

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.saved === true || (!nextProps.comment && prevState.id !== '')) {
      return {
        id: '',
        author: '',
        body: '',
        saved: false,
        authorError: false,
        bodyError: false,
      };
    } else if ((nextProps.comment && (prevState.id === undefined || prevState.id !== nextProps.comment.id))) {
      return {
        id: nextProps.comment.id,
        author: nextProps.comment.author,
        body: nextProps.comment.body,
        authorError: false,
        bodyError: false,
        saved: false,
      };
    }

    return null;
  }

  render() {
    const {id, body, author, authorError, bodyError, saving} = this.state;
    const commentSizeLeft = 100 - body.length;

    return (
      <Segment inverted color='teal'>
        <Form reply inverted>
          <Form.TextArea
            name='body'
            label={`Comment (${commentSizeLeft} left)`}
            placeholder='Comment this post'
            maxLength={100}
            value={body}
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
            value={author}
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
                disabled={saving === true}
                onClick={this.props.cancelEdition}/>
            )
          }
          <Button
            icon='write'
            color='orange'
            labelPosition='left'
            size='mini'
            content='Save comment'
            disabled={saving === true}
            loading={saving === true}
            onClick={this.submitComment}/>
        </Form>
      </Segment>
    );
  }
}

CommentForm.propTypes= {
  history: PropTypes.object.isRequired,
  cancelEdition: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired
};

const mapStateToProps = ({comments}, {saveComment, id}) => {
  // Turn comments into iterable array and filter by parent id
  comments = Object.values(comments)
    .filter((comment) => comment.id === id);

  return {
    id,
    saveComment,
    comment: comments.length > 0 ? comments[0] : undefined
  };
};

export default withRouter(connect(mapStateToProps)(CommentForm));