import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Label, Responsive} from 'semantic-ui-react';

import Thermometer from './Thermometer';
import CustomLabel from './CustomLabel';
import {justDate} from '../utils/format';

const PostItem = (props) => {
  const {ratePost} = props;
  const {id, author, title, commentCount, voteScore, category} = props.post;

  return (
    <Card>
      <Card.Content as={Link} to={`/${category}/${id}`}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <Icon name='user' color='grey' size='small'/> {author} <Icon
            name='calendar' color='grey' size='small' /> {justDate(props.post.timestamp)}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <Label.Group circular>
          {
            commentCount > 0 && (
              <Responsive as={CustomLabel}
                minWidth={Responsive.onlyTablet.minWidth}
                content={commentCount}
                icon='comments'/>
            )
          }
          <Thermometer score={voteScore}/>
          <Button
            icon circular basic
            positive
            size='mini'
            onClick={() => ratePost(id, 'upVote')}>
            <Icon name='thumbs up'/>
          </Button>
          <Button
            icon circular basic
            negative
            size='mini'
            onClick={() => ratePost(id, 'downVote')}>
            <Icon name='thumbs down'/>
          </Button>
        </Label.Group>
      </Card.Content>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  ratePost: PropTypes.func.isRequired
};

export default PostItem;