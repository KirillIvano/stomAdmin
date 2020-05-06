import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import createStore from '@/redux';

import './main.less';
import App from './App';

const rootEl = document.getElementById('root');

render(
    <BrowserRouter>
        <Provider store={createStore()}>
            <App />
        </Provider>
    </BrowserRouter>,
    rootEl,
);
