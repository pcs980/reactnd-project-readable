import React from 'react';
import {connect} from 'react-redux';
import {Menu} from 'semantic-ui-react';

class CategoryMenu extends React.Component {

  render() {
    const {categories, shared, menuClick} = this.props;

    return (
      <Menu vertical tabular fluid>
        <Menu.Item header>Categories:</Menu.Item>
        {categories.map((category) => (
          <Menu.Item
            key={category.name}
            active={category.name === shared.activeMenu}
            onClick={() => menuClick(category.name)}>
            {category.name.toUpperCase()}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
};

const mapStateToProps = ({categories, shared}, {menuClick}) => {
  return {
    menuClick,
    shared,
    categories: Object.values(categories),
  };
};

export default connect(mapStateToProps)(CategoryMenu);