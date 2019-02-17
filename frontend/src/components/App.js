import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading';
import {Container} from 'semantic-ui-react';

import {handleInitialData} from '../actions/shared';

import TopBar from './TopBar';
import PostsView from '../views/PostsView';
import PostDetailView from '../views/PostDetailView';

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
                  <Route path='/' exact component={PostsView}/>
                  <Route path='/new' exact component={PostDetailView}/>
                  <Route path='/:category' exact component={PostsView}/>
                  <Route path='/:category/:postId' exact component={PostDetailView}/>
                </Switch>
          }
        </Container>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({categories}) => {
  return {
    loading: categories === []
  }
}

export default connect(mapStateToProps)(App);
