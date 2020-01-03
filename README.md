# redux 简单使用

redux 提供了 createStore 函数，用来生成 store，store 是保存数据的地方，整个应用只能有一个 store

store 提供了三个方法：

* store.getState() 实时获取 state
* store.dispatch() 发送 action，触发 reducer 函数
* store.subscribe() 设置监听函数，一旦 state 发生变化，自动执行

createStore 的一个 [简单实现](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)：

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```
