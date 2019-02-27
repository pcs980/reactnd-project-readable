import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import CategoryMenu from '../components/CategoryMenu';
import PostList from '../components/PostList';
import PostListControl from '../components/PostListControl';
import {showEvent} from '../utils/toastEvent';

import {handleRatePost, ratePost} from '../actions/posts';
import {searchPosts, sortPosts} from '../actions/shared';

export class PostListView extends React.Component {

  ratePost = (id, option) => {
    const {onRatePost, doStoreRatePost} = this.props;

    onRatePost(id, option)
      .then(() => {
        doStoreRatePost(id, option);
      })
      .catch(() => {
        showEvent('error', 'Your rate wasn\'t saved. Please, try again later.');
      });
  };

  handleSortPosts = (sortBy, fieldType) => {
    this.props.doStoreSortPosts(sortBy, fieldType);
  };

  clearSearch = () => {
    this.props.doStoreSearchPosts('');
  };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>
          <CategoryMenu
            searchPosts={this.props.doSearchPosts}
            category={this.props.selectedCategory}/>
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
  onRatePost: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  doSearchPosts: PropTypes.func.isRequired,
  doStoreRatePost: PropTypes.func.isRequired,
  doStoreSearchPosts: PropTypes.func.isRequired,
  doStoreSortPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  // Receive category in URL params or assume 'all'
  const category = props.match.params.category || 'all';

  return {
    selectedCategory: category
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    onRatePost: (id, option) => (
      dispatch(handleRatePost(id, option))
    ),
    doSearchPosts: (search) => (
      dispatch(searchPosts(search))
    ),
    doStoreRatePost: (id, option) => (
      dispatch(ratePost(id, option))
    ),
    doStoreSearchPosts: () => (
      dispatch(searchPosts(''))
    ),
    doStoreSortPosts: (sortBy, fieldType) => (
      dispatch(sortPosts(sortBy, fieldType))
    )
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostListView));