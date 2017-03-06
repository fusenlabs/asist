import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { Modal } from './../../components/modal';
import List from './../List';
import Nav from './../Nav';
import Footer from './../Footer';
import Clock from './../Clock';
import { ImageProvider } from './../../utils';
import './_index.scss';

const Welcome = () => {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'fadeInDown',
            enterActive: 'fadeInDown',
            leave: 'fadeOutUp',
            leaveActive: 'fadeOutUp',
            appear: 'fadeInDown',
            appearActive: 'fadeInDown',
          }}
          transitionAppear={ true }
          transitionAppearTimeout={ 1000 }
          transitionEnterTimeout={ 1000 }
          transitionLeaveTimeout={ 1 }
        >
          <Nav />
        </ReactCSSTransitionGroup>
        <List />
      </div>
    </div>
  );
};

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
        className="hero is-primary is-fullheight home"
      >
        <div
          className="hero is-primary is-fullheight home-background"
          style={{ backgroundImage: `url(${ImageProvider.picOfDay()})` }}
        ></div>
        <Modal content="Hi!" active={ this.state.showAuthModal } onClose={ this._onAuthClose } />
        <Nav />
        <div className="hero-body">
          <div className="container has-text-centered">
            <Clock className="main-clock" />
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
