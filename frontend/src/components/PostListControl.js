import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Icon, Menu} from 'semantic-ui-react';

// List of fields prepared to sort posts
const sortParameters = [
  {
    caption: 'Title',
    type: 'alphabet',
    field: 'title'
  },
  {
    caption: 'Score',
    type: 'numeric',
    field: 'voteScore'
  },
  {
    caption: 'Date',
    type: 'numeric',
    field: 'timestamp'
  }
];

const PostListControl = (props) => (
  <Menu fluid secondary pointing size='small' icon>
    <Menu.Item as={Link} to='/post'>
      <Icon name='file'/> New Post
    </Menu.Item>

    <Menu.Menu position='right'>
      <Menu.Item header>Sort by:</Menu.Item>
      {
        sortParameters.map((param) => (
          <Menu.Item
            link
            key={param.field}
            onClick={() => props.sortClick(param.field)}
            color='orange'
            active={props.sortBy === param.field}>
            <Icon
              name={`sort ${param.type} ${props.order || 'ascending'}`} />
            {param.caption}
          </Menu.Item>
        ))
      }
    </Menu.Menu>
  </Menu>
);

PostListControl.propTypes = {
  order: PropTypes.string,
  sortBy: PropTypes.string,
  sortClick: PropTypes.func.isRequired
};

const mapStateToProps = ({shared}) => (
  {
    sortBy: shared.sortBy,
    order: shared.order
  }
);

export default connect(mapStateToProps)(PostListControl);