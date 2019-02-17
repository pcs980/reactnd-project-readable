import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Icon, Label, Menu} from 'semantic-ui-react';

class CategoryMenu extends React.Component {

  render() {
    const {categories, selectedCategory} = this.props;

    return (
      <Menu vertical tabular fluid>
        <Menu.Header as='h5'>
          <Icon name='archive'/> Categories
        </Menu.Header>
        {
          categories.map((category) => (
            <Menu.Item as={Link}
              to={`/${category.path}`}
              key={category.name}
              active={category.name === selectedCategory}>
              {
                category.count > 0 && (
                  <Label>{category.count}</Label>
                )
              }
              {category.name.toUpperCase()}
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
};

const mapStateToProps = ({categories}, {category}) => {
  return {
    selectedCategory: category,
    categories: Object.values(categories),
  };
};

export default withRouter(connect(mapStateToProps)(CategoryMenu));