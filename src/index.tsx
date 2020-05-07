import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import createStore from '@/redux';
import {
    Button,
} from '@/components';

import './main.less';
import App from './App';

const rootEl = document.getElementById('root');

render(
    <BrowserRouter>
        <Provider store={createStore()}>
            <Button isDisabled={true}>kek</Button>
            <Button>kek</Button>
            <App />
        </Provider>
    </BrowserRouter>,
    rootEl,
);
