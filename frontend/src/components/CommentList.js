import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Comment, Form, Grid, Header, Icon, Label, Segment} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import {friendlyDate} from '../utils/format';

class CommentList extends React.Component {
  state = {
    author: '',
    body: '',
    authorError: false,
    bodyError: false,
    saving: false
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
      const comment = {
        parentId: this.props.id,
        author: author,
        body: body
      }

      // Start saving
      this.setState({
        saving: true
      }, () => {
        this.props.saveComment(comment);

        // Finish saving and clear state
        this.setState({
          author: '',
          body: '',
          authorError: false,
          bodyError: false,
          saving: false
        });
      });
    }
  }

  render() {
    const {authorError, bodyError} = this.state;
    const {comments, rateComment, deleteComment} = this.props;

    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Comment.Group minimal>
              <Header as='h3' dividing>Comments</Header>
              {
                comments.length > 0 ? comments.map((comment) => (
                  <Comment key={comment.id}>
                    <Comment.Content>
                      <Comment.Author as='a'>{comment.author}</Comment.Author>
                      <Comment.Metadata>{friendlyDate(comment.timestamp)}</Comment.Metadata>
                      <Comment.Text>{comment.body}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>
                          <Thermometer score={comment.voteScore}/>
                        </Comment.Action>
                        <Comment.Action>
                          <Icon
                            name='thumbs up'
                            onClick={() => rateComment(comment.id, 'upVote')}/>
                        </Comment.Action>
                        <Comment.Action>
                          <Icon
                            name='thumbs down'
                            onClick={() => rateComment(comment.id, 'downVote')}/>
                        </Comment.Action>
                        <Comment.Action>
                          <Icon
                            name='trash alternate'
                            onClick={() => deleteComment(comment.id)}/>
                        </Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ))
                : <Comment>
                    <Comment.Text>Be the first to comment!</Comment.Text>
                  </Comment>
              }
              <Segment inverted color='teal'>
                <Form onSubmit={this.submitComment} reply inverted>
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
                  <Button
                    icon='write'
                    color='orange'
                    labelPosition='left'
                    size='mini'
                    loading={this.state.saving === true}
                    content='Add comment'/>
                </Form>
              </Segment>
            </Comment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

CommentList.propTypes = {
  id: PropTypes.string.isRequired,
  saveComment: PropTypes.func.isRequired,
  rateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = ({comments}, {id, saveComment, rateComment, deleteComment}) => {
  return {
    id,
    saveComment,
    rateComment,
    deleteComment,
    comments: Object.values(comments)
      .filter((comment) => comment.parentId === id && comment.deleted === false)
  }
};

export default connect(mapStateToProps)(CommentList);