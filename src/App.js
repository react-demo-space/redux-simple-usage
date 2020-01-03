import React, { Component } from 'react';
import { createStore } from 'redux'

// reducer 是一个函数，它接受 action 和当前 state 作为参数，返回一个新的 state
const reducer = (state = { count: 0 }, action) => {
  switch(action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    default:
      return state
  }
}

// store 是保存数据的地方，整个应用只能有一个 store
// redux 提供了 createStore 函数，用来生成 store
const store = createStore(reducer)

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 当前时刻的 state，可以通过 store.getState() 拿到
      count: store.getState().count
    }

    // store 允许使用 store.subscribe 方法设置监听函数，一旦 store 的 state 发生变化，就自动执行这个函数
    store.subscribe(() => {
      this.setState({ count: store.getState().count })
    })
  }
  handleClick() {
    // store.dispatch 是 View 发出 action 的唯一方法
    // dispatch 方法会触发 reducer 函数的自动执行
    store.dispatch({
      type: 'ADD'
    })
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick.bind(this)}>increase</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Counter/>
      </div>
    );
  }
}

export default App;