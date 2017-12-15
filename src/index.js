import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers'

import './index.css';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"));