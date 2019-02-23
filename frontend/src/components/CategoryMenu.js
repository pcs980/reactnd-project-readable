import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import debounce from 'lodash.debounce';
import {Icon, Input, Label, Menu} from 'semantic-ui-react';

import {searchPosts} from '../actions/shared';

class CategoryMenu extends React.Component {
  state = {
    search: '',
    goneSearch: false
  };

  handleChange = (e, {value}) => {
    const {search} = this.state;
    if (search.toLowerCase() !== value.toLowerCase()) {
      this.setState({
        search: value
      }, () => {
        this.debounceDispatchSearch(value);
      });
    }
  };

  debounceDispatchSearch = debounce((search) => {
    this.setState({
      goneSearch: true
    }, () => this.props.dispatch(searchPosts(search)));
  }, 1500);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchPostByTitle === '' && prevState.goneSearch === true) {
      return {
        search: '',
        goneSearch: false
      };
    } else {
      return null;
    }
  }

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
  selectedCategory: PropTypes.string,
  dispatch: PropTypes.func.isRequired
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
    categories,
    searchPostByTitle: shared.searchPostByTitle,
    selectedCategory: category,
  };
};

export default withRouter(connect(mapStateToProps)(CategoryMenu));