import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'babel-polyfill';
import 'mobx-react-lite/batchingForReactDom';

import './common/main.less';
import App from './App';

const rootEl = document.getElementById('root');

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootEl,
);
