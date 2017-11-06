import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {fetchChart} from './actions';
import './styles/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchChart());

const Main = () => (
        <Provider store = {store}>
            <App/>
        </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

