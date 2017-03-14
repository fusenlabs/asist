import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as AppActions from './../../actions/app';
import { connect } from 'react-redux';

const OpenExternalLink = ({ link }) => {
  return (
    <a href={link} target="_blank" className="level-item level-right" style={{ maxWidth: 20 }}>
      <span className="icon">
        <i className="fa fa-external-link-square"></i>
      </span>
    </a>
  );
};

const Checkbox = ({ checked }) => {
  const checkedClassName = checked ? 'fadeIn' : 'fadeOut';
  const uncheckedClassName = !checked ? 'fadeIn' : 'fadeOut';
  return (
    <span className="icon level-item level-left">
      <i className={`fa fa-check-square-o animated ${checkedClassName}`}></i>
      <i className={`fa fa-square-o animated ${uncheckedClassName}`}></i>
    </span>
  );
};


const ItemLabel = ({ children }) => {
  return (
    <p className="level-item asist-task">{children}</p>
  );
};

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this.state = {
      rowHover: false,
    };
  }

  render() {
    const { item, delay } = this.props;
    const externalUrl = `https://todoist.com/app?#project%2F${item.project_id}`;
    return (
      <div className="column level is-mobile asist-level-row animated flipInX" style={{ animationDelay: `${delay}s` }}>
        <a href="#"
          className="level is-mobile asist-task-wrapper"
          onClick={ this._onClick}
          onMouseEnter={ this._onMouseEnter }
          onMouseLeave={ this._onMouseLeave }
          data-task-id={ item.id }>
          <Checkbox checked={ this.state.rowHover } />
          <ItemLabel>{ item.content }</ItemLabel>
        </a>
        <OpenExternalLink link={ externalUrl } />
      </div>
    );
  }

  _onMouseEnter() {
    this.setState({
      rowHover: true,
    });
  }
  _onMouseLeave() {
    this.setState({
      rowHover: false,
    });
  }

  _onClick(e) {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute('data-task-id'));
    // this.props.removeItem(e.currentTarget.getAttribute('data-task-id'));
  }
}

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

const Motivational = () => {
  return (
    <div className="content column animated fadeIn" style={{ animationDelay: '1s' }}>
      <p>Have a nice day!</p>
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
    // TODO: move this to utils that can be platform awarness.
    const maxHeight = window.innerHeight * 0.45; // 45% of total height;

    const calculatedHeight = itemsHeight > maxHeight ? maxHeight : itemsHeight;
    const itemList = todayList.map((i, index) => {
      return (
        <ItemList item={ i } delay={ 1.5 + (index + 1) / 4 } key={ i.id }/>
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
