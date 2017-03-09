import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { Modal } from './../../components/modal';
import List from './../../components/List';
import Nav from './../../components/Nav';
import Footer from './../../components/Footer';
import Clock from './../../components/Clock';
import { ImageProvider } from './../../utils';
import './_index.scss';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this._onAuthClose = this._onAuthClose.bind(this);

    this.state = {
      showAuthModal: false,
    };
  }

  render() {
    return (
      <section
        className="hero is-black is-fullheight home"
      >
        <div
          className="hero is-black is-fullheight home-background"
          style={{ backgroundImage: `url(${ImageProvider.picOfDay()})` }}
        ></div>
        <Modal content="Hi!" active={ this.state.showAuthModal } onClose={ this._onAuthClose } />
        <Nav />
        <div className="hero-body">
          <div className="container has-text-centered">
            <Clock className="main-clock animated fadeIn" />
            <List />
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  _onAuthClose() {
    this.setState({
      showAuthModal: false,
    });
  }
}

const mapStateToProps = (state) => {
  return {
    // app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
