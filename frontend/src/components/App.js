import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading';
import {Container} from 'semantic-ui-react';

import {handleInitialData} from '../actions/shared';

import PostListView from '../views/PostListView';
import PostDetailView from '../views/PostDetailView';
import TopBar from './TopBar';
import WritePostView from '../views/WritePostView';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      <BrowserRouter>
        <Container>
          <LoadingBar />
          <TopBar />
          {
            this.props.loading === true
              ? null
              : <Switch>
                  <Route path='/' exact component={PostListView}/>
                  <Route path='/post' exact component={WritePostView}/>
                  <Route path='/post/:postId' exact component={WritePostView}/>
                  <Route path='/:category' exact component={PostListView}/>
                  <Route path='/:category/:postId' exact component={PostDetailView}/>
                </Switch>
          }
        </Container>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({loadingBar}) => {
  return {
    loading: loadingBar.default === 1,
  }
}

export default connect(mapStateToProps)(App);
