import React from 'react';
import {Header, Image, Segment} from 'semantic-ui-react';

const TopBar = (props) => (
  <Segment inverted color='teal'>
    <Header as='h2' inverted color='black'>
      <Image
        circular
        alt='Readable Application Icon'
        src='/assets/img/child-reading64.png'
        size='large'/> Readable
    </Header>
  </Segment>
);

export default TopBar;