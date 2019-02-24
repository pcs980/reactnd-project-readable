import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card, Grid, Icon, Segment} from 'semantic-ui-react';

import PostItem from './PostItem';
import ResourceNotFoundView from '../views/ResourceNotFoundView';

class PostList extends React.Component {

  render() {
    const {posts, shared, loading, ratePost, clearSearch} = this.props;
    const order = shared.order || 'ascending';

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