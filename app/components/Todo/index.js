import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class Todo extends Component {
  render() {
    return (<div className="todo-component">
              <input type="text" ref="todoinput"/>
              <button onClick={(e) => this._handleClick(e)}>Add</button>
              <ul>
              {this.props.todoList.map(todo =>
                <li>{todo.text}</li>
              )}
              </ul>
            </div>);
  }

  _handleClick() {
    const node = this.refs.todoinput;
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}
