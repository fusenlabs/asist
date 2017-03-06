import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';

class Auth extends Component {
  constructor(props) {
    super(props);
    this._onClickAuth = this._onClickAuth.bind(this);
  }

  render() {
    return (
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title animated fadeInDown">
              Hi! I'm <b>Asist</b>, a friendly reminder for your daily to-do's.
            </h1>
            <h2 className="subtitle animated fadeInDown">
              I need access to your Todoist tasks.
            </h2>
            <a className="button is-dark animated fadeInUp" onClick={ this._onClickAuth }>Authorize me</a>
          </div>
        </div>
      </section>
    );
  }

  _onClickAuth() {
    this.props.appActions.authorize();
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
