import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
}

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string
};

const mapStateToProps = ({categories, posts, shared}, {category}) => {
  // Turn object into array
  posts = Object.values(posts);

  // Add property count with the count of posts
  categories = Object.values(categories).map((category) => {
    return {
      ...category,
      count: posts.reduce((count, post) => {
        return count + (post.category === category.name && post.deleted === false ? 1 : 0);
      }, 0)
    };
  });

  // Finally add category all to show all posts
  categories = [
    {
      name: 'all',
      path: '',
      count: posts.length
    }, ...categories];

  return {
    shared,
    categories,
    selectedCategory: category,
  };
};

export default withRouter(connect(mapStateToProps)(CategoryMenu));