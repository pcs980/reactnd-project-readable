import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

const ResourceNotFoundView = (props) => (
  <Segment placeholder size='tiny'>
    <Header icon>
      <Icon name='frown outline'/>
      No post found.
    </Header>
    <Segment.Inline>
      {
        props.backButton !== false && (
          <Button
            icon='arrow left'
            color='grey'
            labelPosition='left'
            size='mini'
            content='Back'
            onClick={props.history.goBack}/>
        )
      }
      <Button as={Link} to='/post'
        icon='file'
        color='orange'
        labelPosition='left'
        size='mini'
        content='Write a Post'/>
    </Segment.Inline>
  </Segment>
);

ResourceNotFoundView.propTypes = {
  backButton: PropTypes.bool,
  history: PropTypes.object.isRequired
};

export default withRouter(ResourceNotFoundView);