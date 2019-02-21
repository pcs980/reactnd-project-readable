import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card} from 'semantic-ui-react';

import PostItem from './PostItem';
import ResourceNotFoundView from '../views/ResourceNotFoundView';

class PostList extends React.Component {

  render() {
    const {posts, shared, loading, ratePost} = this.props;
    const order = shared.order || 'ascending';

    return (
      <div>
        {
          posts.length === 0
            ? loading === true
              ? <p>Loading...</p>
              : <ResourceNotFoundView />
            : <Card.Group itemsPerRow={2}>
              {
                posts.sort((a, b) => {
                  if (order === 'ascending') {
                    return a[shared.sortBy] > b[shared.sortBy];
                  } else {
                    return b[shared.sortBy] > a[shared.sortBy];
                  }})
                  .map((post) => (
                    <PostItem
                      key={post.id}
                      ratePost={ratePost}
                      post={post}/>
                  ))
              }
            </Card.Group>
        }
      </div>
    );
  }
}

PostList.propTypes = {
  shared: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  posts: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  ratePost: PropTypes.func.isRequired
};

const mapStateToProps = ({posts, shared, loadingBar}, {category}) => {
  /* Filter only posts which:
    - have post.deleted equal to false
    - have post.catetory equal to received category
    - when category are not equal to all
  */
  const filteredPosts = Object.values(posts).filter((post) =>
    (post.deleted === false && (category === 'all' || post.category === category)));

  return {
    shared,
    category,
    loading: loadingBar.default === 1,
    posts: filteredPosts,
  };
};

export default connect(mapStateToProps)(PostList);