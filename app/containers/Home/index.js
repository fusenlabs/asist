import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../../actions/todo';
import Todo from '../../components/Todo';

import '!style!css!sass!./index.scss';

class Home extends React.Component {
  render() {
    const { todoActions, todos } = this.props;
    return (<div className='home-page wrapper-container'>
              <Todo todoList={todos} onAddClick={this.props.todoActions.addTodo}/>
            </div>);
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(TodoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
