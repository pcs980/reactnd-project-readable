import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card, Grid, Icon, Segment} from 'semantic-ui-react';

import PostItem from './PostItem';
import ResourceNotFoundView from '../views/ResourceNotFoundView';

class PostList extends React.Component {

  // Sort fields accordingly to it's type (numeric or alphabetic)
  resolveOrder = (a, b) => {
    const {sortBy, fielType} = this.props.shared;
    const order = this.props.shared.order || 'ascending';

    if (order === 'ascending') {
      if (fielType === 'numeric') {
        return a[sortBy] - b[sortBy];
      } else {
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
      }
    } else {
      if (fielType === 'numeric') {
        return b[sortBy] - a[sortBy];
      } else {
        if (b[sortBy] > a[sortBy]) {
          return 1;
        }
      }
    }
    return 0;
  };

  render() {
    const {posts, shared, loading, ratePost, clearSearch} = this.props;

    const searchAlertBar =
      <Segment inverted color='orange'>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Icon
                name='exclamation triangle'
                inverted size='small'/>
              {`Showing posts with '${shared.searchPostByTitle}'`}
            </Grid.Column>
            <Grid.Column width={4}>
              <Button icon
                floated='right'
                size='mini'
                onClick={clearSearch}>
                Show all
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>;

    if (posts.length === 0 && loading === false) {
      return (
        <div>
          {searchAlertBar}
          <ResourceNotFoundView backButton={false}/>
        </div>
      );
    }

    return (
      <div>
        {
          shared.searchPostByTitle && searchAlertBar
        }
        <Card.Group itemsPerRow={2}>
          {
            posts.sort((a, b) => this.resolveOrder(a, b))
              .map((post) => (
                <PostItem
                  key={post.id}
                  ratePost={ratePost}
                  post={post}/>
              ))
          }
        </Card.Group>
      </div>
    );
  }
}

PostList.propTypes = {
  shared: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  ratePost: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
};

const mapStateToProps = ({posts, shared, loadingBar}, {category}) => {
  /* Get only posts which:
    - have post.deleted equal to false
    - have post.catetory equal to received category
    - when category are not equal to all
    - when the title includes the search value, if defined
  */
  posts = Object.values(posts).filter((post) =>
    (post.deleted === false
      && (category === 'all' || post.category === category)
      && (!shared.searchPostByTitle || post.title.toLowerCase().includes(shared.searchPostByTitle.toLowerCase()))));

  return {
    shared,
    category,
    posts,
    loading: loadingBar.default === 1,
  };
};

export default connect(mapStateToProps)(PostList);