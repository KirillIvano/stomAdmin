import React from 'react';
import {render} from 'react-dom';

import './main.less';
import App from './App';

const rootEl = document.getElementById('root');

render(
    <div>
        <App />
    </div>,
    rootEl,
);
