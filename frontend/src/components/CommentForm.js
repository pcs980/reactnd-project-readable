import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Form, Label, Segment} from 'semantic-ui-react';

class CommentForm extends React.Component {
  state = {
    id: undefined,
    author: '',
    body: '',
    authorError: false,
    bodyError: false,
    loaded: false,
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

    const {id, author, body} = this.state;
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
        id: id,
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
              id: undefined,
              saved: true,
              saving: false
            });
          });
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.saved === true) {
      return {
        id: undefined,
        author: '',
        body: '',
        saved: false,
        authorError: false,
        bodyError: false,
      };
    } else if ((nextProps.comment && prevState.loaded === false)) {
      return {
        id: nextProps.comment.id,
        author: nextProps.comment.author,
        body: nextProps.comment.body,
        authorError: false,
        bodyError: false,
        saved: false,
        loaded: true
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
  saveComment: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func.isRequired
};

const mapStateToProps = ({comments}, {saveComment, id}) => {

  const comment = Object.values(comments)
    .filter((comment) => comment.id === id);

  return {
    id,
    saveComment,
    comment: comment.length > 0 ? comment[0] : undefined
  };
};

export default withRouter(connect(mapStateToProps)(CommentForm));