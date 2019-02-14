import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Label, Popup} from 'semantic-ui-react';
/*
author: "thingtwo"
​​​body: "Everyone says so after all."
​​​category: "react"
​​​commentCount: 2
​​​deleted: false
​​​id: "8xf0y6ziyjabvozdd253nd"
​​​timestamp: 1467166872634
​​​title: "Udacity is the best place to learn React"
​voteScore: 6
*/
const PostCard = (props) => {
  let scale, color;
  const {author, title, body, commentCount, voteScore} = props.post;

  // Define thermometer color and scale based on vote score
  switch (true) {
    case voteScore < 1:
      scale = 'empty';
      color = 'blue';
      break;
    case voteScore >= 1 && voteScore < 5:
      scale = 'quarter';
      color = 'yellow';
      break;
    case voteScore >= 5 && voteScore < 10:
      scale = 'half';
      color = 'orange';
      break;
    default:
      scale = 'full';
      color = 'red';
      break;
  }

  return (
    <Card>
      <Card.Content as='a'>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <Icon name='user' color='grey' size='small'/> {author}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label basic image>
          <Icon name={`thermometer ${scale}`} size='large' color={color}/>
          {voteScore}
        </Label>

        {
          commentCount > 0 && (
            <Label basic image>
              <Icon name='comments outline' size='large'/>
              {commentCount}
            </Label>
          )
        }

        <Popup
          trigger={<Button floated='right' size='small' icon='thumbs down' color='red'/>}
          content='Down vote'
          />
        <Popup
          trigger={<Button floated='right' size='small' icon='thumbs up' color='green'/>}
          content='Up vote'
          />
      </Card.Content>
    </Card>
  );
};

export default connect()(PostCard);