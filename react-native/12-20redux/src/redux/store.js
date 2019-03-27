/*
redux管理状态的核心对象
 */
// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
//
// import reducers from './reducers'  // 它是一个reducer函数
//
// export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))


import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import thunk from 'redux-thunk'
const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      // applyMiddleware(createLogger()),
      applyMiddleware(thunk)
    )
  );
}

const store = configureStore();

export default store;
