import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { connect } from 'react-redux';

const ItemList = ({ item }) => {
  return (
    <div className="column animated fadeInUp">
      {item.content}
    </div>
  );
};

class List extends Component {
  componentDidMount() {
    if (!this.props.app.todayList.length) {
      this.props.appActions.loadTodayList();
    }
  }

  render() {
    const { todayList } = this.props.app;
    return (
      <div>
        {todayList.map(i => <ItemList item={ i } key={ i.id }/>)}
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
