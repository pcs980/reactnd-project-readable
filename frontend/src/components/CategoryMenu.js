import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Icon, Input, Label, Menu} from 'semantic-ui-react';

class CategoryMenu extends React.Component {
  state = {
    search: ''
  };

  handleChange = (e, {value}) => {
    this.setState({
      search: value
    });
  };

  render() {
    const {categories, selectedCategory} = this.props;

    return (
      <Menu vertical fluid tabular color='orange'>
        <Menu.Item header as='h5'>
          <Icon name='archive'/> Categories
        </Menu.Item>
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
        <Menu.Item>
          <Input
            name='search'
            placeholder='Search posts'
            value={this.state.search}
            onChange={this.handleChange}
            icon='search'/>
        </Menu.Item>
      </Menu>
    );
  }
};

const mapStateToProps = ({categories, shared}, {category}) => {
  return {
    shared,
    selectedCategory: category,
    categories: Object.values(categories),
  };
};

export default withRouter(connect(mapStateToProps)(CategoryMenu));