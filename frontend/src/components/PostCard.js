import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card, Icon, Label, Responsive} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import {justDate} from '../utils/format';

const PostCard = (props) => {
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
      <Card.Content extra>
        <Label.Group circular>
        <Thermometer score={voteScore}/>
        {
          commentCount > 0 && (
            <Responsive as={Label} minWidth={Responsive.onlyTablet.minWidth} basic image color='grey'>
              <Icon name='comments'/>
              {commentCount}
            </Responsive>
          )
        }
        </Label.Group>

      </Card.Content>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostCard;