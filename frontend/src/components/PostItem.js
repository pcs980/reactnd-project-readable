import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card, Icon, Label, Responsive} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import CustomLabel from './CustomLabel';
import {justDate} from '../utils/format';

const PostItem = (props) => {
  const {id, author, title, commentCount, voteScore, category} = props.post;

  return (
    <Card as={Link} to={`/${category}/${id}`}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <Icon name='user' color='grey' size='small'/> {author} <Icon
            name='calendar' color='grey' size='small' /> {justDate(props.post.timestamp)}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <Label.Group circular>
          <Thermometer score={voteScore}/>
          {
            commentCount > 0 && (
              <Responsive as={CustomLabel}
                minWidth={Responsive.onlyTablet.minWidth}
                content={commentCount}
                icon='comments'/>
            )
          }
          <Responsive as={CustomLabel}
            minWidth={Responsive.onlyTablet.minWidth}
            icon='thumbs up'/>
          <Responsive as={CustomLabel}
            minWidth={Responsive.onlyTablet.minWidth}
            icon='thumbs down'/>
        </Label.Group>
      </Card.Content>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;