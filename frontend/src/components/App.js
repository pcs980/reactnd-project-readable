import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import {ToastContainer} from 'react-toastify';
import {Container} from 'semantic-ui-react';

import {handleInitialData} from '../actions/shared';

import Loading from './Loading';
import PostDetailView from '../views/PostDetailView';
import PostListView from '../views/PostListView';
import PostWriteView from '../views/PostWriteView';
import TopBar from './TopBar';

import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {

  componentDidMount() {
    this.props.getInitialData();
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <LoadingBar />
          <TopBar />
          {
            this.props.loading === true
              ? <Loading />
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
  getInitialData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({loadingBar}) => (
  {
    loading: loadingBar.default === 1,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    getInitialData: () => {
      dispatch(handleInitialData());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
