import React from 'react';
import {Icon, Label} from 'semantic-ui-react';

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
    <Label basic image>
      <Icon name={`thermometer ${scale}`} size='large' color={color}/>
      {props.score}
    </Label>
  );
}

export default Thermometer;