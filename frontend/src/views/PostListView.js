import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import PostListControl from '../components/PostListControl';
import CategoryMenu from '../components/CategoryMenu';
import PostList from '../components/PostList';

import {sortPosts} from '../actions/shared';

class PostListView extends React.Component {

  handleSortPosts = (sortBy) => {
    this.props.dispatch(sortPosts(sortBy));
  };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={4}>
          <CategoryMenu category={this.props.selectedCategory}/>
        </Grid.Column>
        <Grid.Column width={12}>
          <PostListControl sortClick={this.handleSortPosts}/>
          <PostList category={this.props.selectedCategory}/>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => {
  // Receive category in URL params or assume 'all'
  const category = props.match.params.category || 'all';

  return {
    ...state,
    selectedCategory: category
  };
}

export default withRouter(connect(mapStateToProps)(PostListView));