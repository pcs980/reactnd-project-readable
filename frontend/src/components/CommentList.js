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
      editCommentId: ''
    });
  };

  render() {
    const {comments, deleteComment, rateComment, saveComment, updateComment} = this.props;

    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={10}>
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
                saveComment={saveComment}
                updateComment={updateComment}/>
            </Comment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

CommentList.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  rateComment: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired
};

const mapStateToProps = ({comments}, {id, saveComment, rateComment, deleteComment}) => (
  {
    id,
    saveComment,
    rateComment,
    deleteComment,
    comments: Object.values(comments)
      .filter((comment) => comment.parentId === id && comment.deleted === false)
  }
);

export default connect(mapStateToProps)(CommentList);