import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import Home from './../../components/Home';

class HomeContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return <Home value={this.props.app.value} increment={this.props.appActions.increment}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(AppActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
