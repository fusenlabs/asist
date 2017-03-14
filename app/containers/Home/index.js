import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import List from './../../containers/List';
import Nav from './../../components/Nav';
import Footer from './../../components/Footer';
import Clock from './../../components/Clock';
import { ImageProvider } from './../../utils';
import './_index.scss';

class HomeContainer extends Component {
  render() {
    return (
      <section
        className="hero is-black is-fullheight home"
      >
        <div
          className="hero is-black is-fullheight home-background"
          style={{ backgroundImage: `url(${ImageProvider.picOfDay()})` }}
        ></div>
        <Nav />
        <div className="hero-body">
          <div className="container -has-text-centered">
            <Clock className="main-clock animated fadeIn" />
            <List />
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
