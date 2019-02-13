import React from 'react';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading';
import {Container, Grid, Header} from 'semantic-ui-react';

import {handleInitialData} from '../actions';
import {changeCategory} from '../actions/categories';

import CategoryMenu from './CategoryMenu';

class App extends React.Component {

  handleMenuClick = (menu) => {
    this.props.dispatch(changeCategory(menu));
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Container>
        <LoadingBar />
        <Header as='h2'>
          <Header.Content>
            Readable
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Column width={4}>
            <CategoryMenu menuClick={this.handleMenuClick}/>
          </Grid.Column>
          <Grid.Column heigth={20}>

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
