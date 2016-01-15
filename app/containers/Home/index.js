import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LoadingActions from '../../actions/loading';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import '!style!css!sass!./index.scss';

class Home extends React.Component {
  render() {
    const { loadingActions } = this.props;
    return (<div className='home-page wrapper-container'>
              <Loading show={this.props.showLoading}/>
              <Button name='Joel' onSelect={loadingActions.loadingOn}/>
            </div>);
  }
}

function mapStateToProps(state) {
  return {
    showLoading: state.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadingActions: bindActionCreators(LoadingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
