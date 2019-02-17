import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Label} from 'semantic-ui-react';

const CustomLabel = (props) => (
  <Label basic image color='grey'>
    {
      props.icon && (<Icon name={props.icon}/>)
    }
    {props.content}
  </Label>
);

CustomLabel.propTypes = {
  icon: PropTypes.string,
  content: PropTypes.string.isRequired
}

export default CustomLabel;