import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import {ToastContainer} from 'react-toastify';
import {Container} from 'semantic-ui-react';

import {handleInitialData} from '../actions/shared';

import PostListView from '../views/PostListView';
import PostDetailView from '../views/PostDetailView';
import TopBar from './TopBar';
import PostWriteView from '../views/PostWriteView';

import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

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
                <Route path='/post' exact component={PostWriteView}/>
                <Route path='/post/:postId' exact component={PostWriteView}/>
                <Route path='/:category' exact component={PostListView}/>
                <Route path='/:category/:postId' exact component={PostDetailView}/>
              </Switch>
          }
          <ToastContainer
            hideProgressBar
            position='top-center'
            autoClose={2500}/>
        </Container>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({loadingBar}) => {
  return {
    loading: loadingBar.default === 1,
  };
};

export default connect(mapStateToProps)(App);
