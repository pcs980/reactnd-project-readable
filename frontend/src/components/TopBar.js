import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Header, Image, Segment} from 'semantic-ui-react';

const TopBar = (props) => (
  <Segment inverted color='teal'>
    <Container as={Link} to='/'>
      <Header as='h2' inverted color='black'>
        <Image
          circular
          alt='Readable Application Icon'
          src='/assets/img/child-reading64.png'
          size='large'/> Readable
      </Header>
    </Container>
  </Segment>
);

export default TopBar;