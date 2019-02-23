import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import PostListControl from '../components/PostListControl';
import CategoryMenu from '../components/CategoryMenu';
import PostList from '../components/PostList';

import {handleRatePost} from '../actions/posts';
import {searchPosts, sortPosts} from '../actions/shared';

class PostListView extends React.Component {

  ratePost = (id, option) => {
    this.props.dispatch(handleRatePost(id, option));
  };

  handleSortPosts = (sortBy) => {
    this.props.dispatch(sortPosts(sortBy));
  };

  clearSearch = () => {
    this.props.dispatch(searchPosts(''));
  };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>
          <CategoryMenu category={this.props.selectedCategory}/>
        </Grid.Column>
        <Grid.Column width={11}>
          <PostListControl sortClick={this.handleSortPosts}/>
          <PostList
            clearSearch={this.clearSearch}
            ratePost={this.ratePost}
            category={this.props.selectedCategory}/>
        </Grid.Column>
      </Grid>
    );
  }
}

PostListView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => {
  // Receive category in URL params or assume 'all'
  const category = props.match.params.category || 'all';

  return {
    selectedCategory: category
  };
};

export default withRouter(connect(mapStateToProps)(PostListView));