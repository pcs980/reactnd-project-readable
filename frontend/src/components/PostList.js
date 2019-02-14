import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'semantic-ui-react';

import SortControl from './SortControl';
import PostCard from './PostCard';

class PostList extends React.Component {

  render() {
    const {posts, shared} = this.props;

    if (posts.length === 0) {
      return (
        // TODO: make a better view
        <div>No post found</div>
      );
    }
    return (
      <div>
        <SortControl sortClick={this.props.sortClick}/>
        <Card.Group itemsPerRow={2}>
          {
            posts
              .sort((a, b) => {
                if (shared.order === 'ascending') {
                  return a[shared.sortBy] - b[shared.sortBy]
                } else {
                  return b[shared.sortBy] - a[shared.sortBy]
                }
              })
              .map((post) => (
              <PostCard key={post.id} post={post}/>
            ))
          }
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({posts, shared}) => (
  {
    posts: Object.values(posts).filter((post) => post.category === shared.activeMenu),
    shared
  }
);

export default connect(mapStateToProps)(PostList);