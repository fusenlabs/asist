import React, { Component } from 'react';
import OpenExternalLink from './../OpenExternalLink';
import Checkbox from './../Checkbox';
import ItemLabel from './../ItemLabel';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      rowHover: false,
      delay: props.delay,
    };
  }

  render() {
    const { item } = this.props;
    const externalUrl = `https://todoist.com/app?#project%2F${item.project_id}`;
    const statusClassName = this._getClassNameByStatus(this.props.removed);
    const statusStyle = this._getStyleNameByStatus(this.props.removed);
    return (
      <div
        className={ `column level is-mobile asist-level-row animated ${statusClassName}` }
        style={ statusStyle }>
        <a href="#"
          className="level is-mobile asist-task-wrapper"
          onClick={ this._onClick}
          onMouseEnter={ this._onMouseEnter }
          onMouseLeave={ this._onMouseLeave }
          data-task-id={ item.id }>
          <Checkbox
            checked={ this.state.rowHover || this.props.removed }
            animated={ !this.props.removed }
          />
          <ItemLabel>{ item.content }</ItemLabel>
        </a>
        <OpenExternalLink link={ externalUrl } />
      </div>
    );
  }

  _getClassNameByStatus(removed) {
    return removed ? 'fadeOut asist-animated-item asist-shrink-item' : 'flipInX';
  }

  _getStyleNameByStatus(removed) {
    return removed ? {} : { animationDelay: `${this.state.delay}s` };
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
    this.props.removeItem(e.currentTarget.getAttribute('data-task-id'));
  }
}

export default ItemList;
