import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Icon, Menu} from 'semantic-ui-react';

const sortParameters = [
  {
    caption: 'Title',
    field: 'title'
  },
  {
    caption: 'Score',
    field: 'voteScore'
  },
  {
    caption: 'Date',
    field: 'timestamp'
  }
];

// TODO: add 'New post' button and search field
const ListControl = (props) => (
  <Menu fluid borderless secondary size='small'>
    <Menu.Item as={Link} to='/new'>
      <Icon name='write'/>
      New Post
    </Menu.Item>

    <Menu.Menu position='right'>
      <Menu.Item header>Sort by:</Menu.Item>
      {
        sortParameters.map((param) => (
          <Menu.Item
            link
            key={param.field}
            onClick={() => props.sortClick(param.field)}
            color='teal'
            active={props.shared.sortBy === param.field}>
              <Icon
                name={`sort content ${props.shared.order || 'ascending'}`} />
            {param.caption}
          </Menu.Item>
        ))
      }
    </Menu.Menu>
  </Menu>
);

const mapStateToProps = ({shared}) => {
  return {
    shared
  };
}

export default connect(mapStateToProps)(ListControl);