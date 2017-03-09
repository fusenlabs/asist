import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { connect } from 'react-redux';

const ItemList = ({ item, delay }) => {
  return (
    <div className="column animated flipInX" style={{ animationDelay: `${delay}s` }}>
      {item.content}
    </div>
  );
};

const Loading = ({ isLoading }) => {
  const visibleClassName = isLoading ? 'show' : 'hide';
  return (
    <div className={`column loading ${visibleClassName}`}>
      <span className="icon rotating">
        <i className="fa fa-circle-o-notch"></i>
      </span>
    </div>
  );
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 5, // space in pixels to avoid unnecesary scroll into container.
      itemHeight: 42, // height of single list item in pixels.
    };
  }

  componentDidMount() {
    if (!this.props.app.todayList.length) {
      this.props.appActions.loadTodayList();
    }
  }

  render() {
    const { todayList } = this.props.app;
    let itemsHeight = todayList.length
      ? todayList.length * this.state.itemHeight + this.state.offset
      : this.state.itemHeight;
    // todo: move this to utils that can be platform awarness.
    const maxHeight = window.innerHeight * 0.45; // 45% of total height;
    const calculatedHeight = itemsHeight > maxHeight ? maxHeight : itemsHeight;
    const itemList = todayList.map((i, index) => {
      return (
        <ItemList item={ i } delay={ 0.5 + (index + 1) / 4 } key={ i.id }/>
      );
    });

    return (
      <div className="list-container" style={{ height: calculatedHeight, _border: '1px solid red' }}>
        <Loading isLoading={!itemList.length}/>
        { itemList }
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
