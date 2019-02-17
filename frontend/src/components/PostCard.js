import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Icon, Label, Popup, Responsive} from 'semantic-ui-react';

import Thermometer from './Thermometer';

const PostCard = (props) => {
  const {id, author, title, commentCount, voteScore, category} = props.post;

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to={`/${category}/${id}`}>
            {title}
          </Link>
        </Card.Header>
        <Card.Meta>
          <Icon name='user' color='grey' size='small'/> {author}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Thermometer score={voteScore}/>

        {
          commentCount > 0 && (
            <Responsive as={Label} minWidth={Responsive.onlyTablet.minWidth} basic image>
              <Icon name='comments outline' size='large'/>
              {commentCount}
            </Responsive>
          )
        }

        <Responsive as={Popup} {...Responsive.onlyComputer}
          trigger={<Button basic floated='right' size='small' icon='thumbs down' negative/>}
          content='Down vote'
          />
        <Responsive as={Popup} {...Responsive.onlyComputer}
          trigger={<Button basic floated='right' size='small' icon='thumbs up' positive/>}
          content='Up vote'
          />

      </Card.Content>
    </Card>
  );
};

export default PostCard;