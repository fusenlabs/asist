import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { connect } from 'react-redux';
import Loading from './../../components/Loading';
import Motivational from './../../components/Motivational';
import ItemList from './../../components/ItemList';

class List extends Component {
  constructor(props) {
    super(props);
    this._onRemoveItem = this._onRemoveItem.bind(this);
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
    // TODO: move this to utils that can be platform awarness.
    const maxHeight = window.innerHeight * 0.45; // 45% of total height;

    const calculatedHeight = itemsHeight > maxHeight ? maxHeight : itemsHeight;
    const itemList = todayList.map((i, index) => {
      return (
        <ItemList
          item={ i }
          delay={ 0.5 + (index + 1) / 4 }
          key={ i.id }
          removed={ i._removed }
          removeItem={ this._onRemoveItem }
        />
      );
    });
    const isLoading = this.props.app.loading;
    const hasItems = todayList.length;

    return (
      <div className="list-container" style={{ height: calculatedHeight, _border: '1px solid red' }}>
        <Loading isLoading={ isLoading }/>
        { !isLoading && hasItems ?
          itemList
          :
          <Motivational />
        }
      </div>
    );
  }

  _onRemoveItem(itemId) {
    this.props.appActions.removeItem(Number(itemId));
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
