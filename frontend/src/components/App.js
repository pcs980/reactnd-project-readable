import React from 'react';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading';
import {Container, Grid} from 'semantic-ui-react';

import {handleInitialData} from '../actions/shared';
import {changeCategory, sortPosts} from '../actions/shared';

import TopBar from './TopBar';
import CategoryMenu from './CategoryMenu';
import PostList from './PostList';

class App extends React.Component {

  handleMenuClick = (menu) => {
    this.props.dispatch(changeCategory(menu));
  };

  handleSortPosts = (sortBy) => {
    this.props.dispatch(sortPosts(sortBy));
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      <Container>
        <LoadingBar />
        <TopBar />
        <Grid columns={2}>
          <Grid.Column width={4}>
            <CategoryMenu menuClick={this.handleMenuClick}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <PostList sortClick={this.handleSortPosts}/>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({categories}) => {
  return {
    loading: categories === []
  }
}

export default connect(mapStateToProps)(App);
