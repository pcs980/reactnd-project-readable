import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Label, Popup} from 'semantic-ui-react';

const Thermometer = (props) => {
  // Define thermometer color and scale based on received score
  let scale, color;
  switch (true) {
  case props.score < 1:
    scale = 'empty';
    color = 'blue';
    break;
  case props.score >= 1 && props.score < 5:
    scale = 'quarter';
    color = 'yellow';
    break;
  case props.score >= 5 && props.score < 10:
    scale = 'half';
    color = 'orange';
    break;
  default:
    scale = 'full';
    color = 'red';
    break;
  }

  return (
    <Popup
      trigger={
        <Label basic image color='grey'>
          <Icon name={`thermometer ${scale}`} color={color}/>
          {props.score}º
        </Label>
      }
      on='click'
      content='Score'/>
  );
};

Thermometer.propTypes = {
  score: PropTypes.number.isRequired
};

export default Thermometer;