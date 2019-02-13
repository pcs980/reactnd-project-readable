import React from 'react';
import {connect} from 'react-redux';
import {Menu} from 'semantic-ui-react';

class CategoryMenu extends React.Component {

  render() {
    const {categories, menuClick} = this.props;

    return (
      <Menu vertical tabular fluid>
        {categories.map((category) => (
          <Menu.Item
            key={category.name}
            active={category.active === true}
            onClick={() => menuClick(category.name)}>
            {category.name.toUpperCase()}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
};

const mapStateToProps = ({categories}, {menuClick}) => {
  return {
    menuClick,
    categories: Object.values(categories),
  };
};

export default connect(mapStateToProps)(CategoryMenu);