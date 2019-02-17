import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'semantic-ui-react';

import PostCard from './PostCard';

class PostList extends React.Component {

  render() {
    const {posts, shared} = this.props;
    const order = shared.order || 'ascending';

    if (posts.length === 0) {
      return (
        // TODO: make a better view
        <div>No post found</div>
      );
    }
    return (
      <div>
        <Card.Group itemsPerRow={2}>
          {
            posts.sort((a, b) => {
              if (order === 'ascending') {
                return a[shared.sortBy] < b[shared.sortBy]
              } else {
                return b[shared.sortBy] < a[shared.sortBy]
              }})
              .map((post) => (
              <PostCard key={post.id} post={post}/>
            ))
          }
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({posts, shared}, {category}) => (
  {
    posts: Object.values(posts).filter((post) => category === 'all' || post.category === category),
    shared,
    category
  }
);

export default connect(mapStateToProps)(PostList);