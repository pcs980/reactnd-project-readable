import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Comment, Grid, Header} from 'semantic-ui-react';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

class CommentList extends React.Component {
  state = {
    editCommentId: undefined
  };

  editComment = (id) => {
    this.setState({
      editCommentId: id
    });
  };

  cancelCommentEdit = () => {
    this.setState({
      editCommentId: undefined
    })
  }

  render() {
    const {comments, saveComment, rateComment, deleteComment} = this.props;

    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Comment.Group minimal>
              <Header as='h3' dividing>Comments</Header>
              {
                comments.length > 0 ? comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    editComment={() => this.editComment(comment.id)}
                    rateComment={rateComment}
                    deleteComment={deleteComment} />
                ))
                : <Comment>
                    <Comment.Text>Be the first to comment!</Comment.Text>
                  </Comment>
              }
              <CommentForm
                id={this.state.editCommentId}
                cancelEdition={this.cancelCommentEdit}
                saveComment={saveComment}/>
            </Comment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

CommentList.propTypes = {
  id: PropTypes.string.isRequired
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