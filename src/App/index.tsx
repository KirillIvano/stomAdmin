import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import createStore from '@/redux';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={createStore()}>
                <div>
                    {'app'}
                </div>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
