import React from 'react';
import {connect} from 'react-redux';
import {Icon, Menu} from 'semantic-ui-react';

const sortParameters = [
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
const SortControl = (props) => (
  <Menu fluid borderless secondary size='small'>
    <Menu.Item header position='right'>Sort by:</Menu.Item>
    {
      sortParameters.map((param) => (
        <Menu.Item
          link
          key={param.field}
          onClick={() => props.sortClick(param.field)}
          color='teal'
          active={props.shared.sortBy === param.field}>
            <Icon
              name={`sort content ${props.shared.order}`} />
          {param.caption}
        </Menu.Item>
      ))
    }
  </Menu>
);

const mapStateToProps = ({shared}) => {
  return {
    shared
  };
}

export default connect(mapStateToProps)(SortControl);