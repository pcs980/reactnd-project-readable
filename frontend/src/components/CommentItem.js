import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Comment, Icon, Popup} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import {friendlyDate} from '../utils/format';

const CommentItem = ({comment, editComment, rateComment, deleteComment}) => (
  <Comment>
    <Comment.Content>
      <Comment.Author as='a'>{comment.author}</Comment.Author>
      <Comment.Metadata>{friendlyDate(comment.timestamp)}</Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>
          <Thermometer score={comment.voteScore}/>
        </Comment.Action>
        <Comment.Action>
          <Popup basic content='Up vote'
            trigger={<Icon name='thumbs up'
              onClick={() => rateComment(comment.id, 'upVote')}/>}/>
        </Comment.Action>
        <Comment.Action>
          <Popup basic content='Down vote'
            trigger={<Icon name='thumbs down'
              onClick={() => rateComment(comment.id, 'downVote')}/>}/>
        </Comment.Action>
        <Comment.Action>
          <Popup basic content='Edit'
            trigger={<Icon name='file alternate'
              onClick={() => editComment(comment.id)}/>}/>
        </Comment.Action>
        <Comment.Action>
          <Popup basic content='Delete'
            trigger={<Icon name='trash alternate'
              onClick={() => deleteComment(comment.id)}/>}/>
        </Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  editComment: PropTypes.func.isRequired,
  rateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = ({comments}, {comment, editComment, rateComment, deleteComment}) => {
  return {
    comment,
    editComment,
    rateComment,
    deleteComment,
    comments
  };
};

export default connect(mapStateToProps)(CommentItem);