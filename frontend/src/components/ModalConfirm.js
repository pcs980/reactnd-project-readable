import React from 'react';
import PropTypes from 'prop-types';
import {Confirm} from 'semantic-ui-react';

const ModalConfirm = ({content, confirmButton, cancelButton, onConfirm, onCancel, open}) => (
  <Confirm
    content={content}
    confirmButton={confirmButton ? confirmButton : 'Yes'}
    cancelButton={cancelButton ? cancelButton : 'No. Forget it...'}
    size='tiny'
    onConfirm={onConfirm}
    onCancel={onCancel}
    open={open}/>
);

ModalConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  confirmButton: PropTypes.string,
  cancelButton: PropTypes.string
};

export default ModalConfirm;