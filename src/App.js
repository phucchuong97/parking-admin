import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { SnackbarProvider } from 'notistack';
import { isAuth } from './api/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

const browserHistory = createBrowserHistory();
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-50px',
      marginLeft: '-50px',
      width: '100px',
      height: '100px'
    };
  }

  async componentWillMount() {
    const isLogin = await isAuth();
    this.setState({ isReady: true });
    isLogin &&
      (await this.props.isLogedIn()) &&
      browserHistory.push('/dashboard');
  }

  render() {
    return this.state.isReady ? (
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    ) : (
      <div style={this.style}>
        <CircularProgress />
      </div>
    );
  }
}

export default connect(null, actions)(App);
