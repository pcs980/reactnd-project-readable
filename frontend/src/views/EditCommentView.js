import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from '../components/CommentForm';

const EditCommentView = ({comment}) => {
  return (
    <CommentForm comment={comment}/>
  );
};

EditCommentView.propTypes = {
  comment: PropTypes.object.isRequired
};

export default EditCommentView;