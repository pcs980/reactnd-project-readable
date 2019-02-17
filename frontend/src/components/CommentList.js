import React from 'react';
import {connect} from 'react-redux';
import {Card, Grid, Feed, Form, Label, Icon, Segment} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import {formatDate} from '../utils/format';

import {handleSaveComment, handleGetPostComments} from '../actions/comments';

class CommentList extends React.Component {
  state = {
    author: '',
    body: '',
    authorError: false,
    bodyError: false
  };

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  submitComment = () => {
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
      this.props.dispatch(handleSaveComment(comment));
    }
  }

  componentDidMount() {
    const {id, comments, dispatch} = this.props;
    // Check if post comments are already in store...
    console.log('COMMENT LIST did mount >', id, '<');
    if (comments.length === 0 && id !== '') {
      // ...if not, dispatch a request to API
      dispatch(handleGetPostComments(id));
    }
  }

  render() {
    const {authorError, bodyError} = this.state;

    return (
      <Segment textAlign='center' vertical>
      <Grid centered>
        <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Comments
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Form onSubmit={this.submitComment}>
              <Form.TextArea
                name='body'
                label='Comment'
                placeholder='Comment this post'
                maxLength={100}
                value={this.state.body}
                onChange={this.handleChange}
                rows={2}
                autoHeight/>
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
                maxLength={20}/>
                {
                  authorError === true && (
                    <Label pointing basic color='red'>Please tell us your user name</Label>
                  )
                }
              <Form.Button>Add comment</Form.Button>
            </Form>
          </Card.Content>
          <Card.Content>
            <Feed>
              {
                this.props.comments.length > 0
                ? this.props.comments.map((comment) => (
                    <Feed.Event key={comment.id}>
                      <Feed.Label>
                        <Icon name='user'/>
                      </Feed.Label>
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{comment.author}</Feed.User>
                          <Feed.Date>{formatDate(comment.timestamp)}</Feed.Date>
                        <Feed.Extra text>
                          {comment.body}
                        </Feed.Extra>
                        </Feed.Summary>
                        <Feed.Meta>
                          <Feed.Like>
                            <Thermometer score={comment.voteScore} />
                          </Feed.Like>
                        </Feed.Meta>
                      </Feed.Content>
                    </Feed.Event>
                ))
                  : <Feed.Event>
                      <Feed.Summary>Be the first to comment!</Feed.Summary>
                    </Feed.Event>
              }
            </Feed>
          </Card.Content>
        </Card>
        </Grid.Column>
      </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = ({comments}, {id}) => {
  return {
    id,
    comments: Object.values(comments).filter((comment) => comment.parentId === id)
  }
};

export default connect(mapStateToProps)(CommentList);