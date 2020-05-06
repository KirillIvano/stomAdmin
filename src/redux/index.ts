import {createStore, compose, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import reducer from './reducers';
import epic from './epics';

const composeEnhancers = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const epicMiddleware = createEpicMiddleware();

const logger = store => next => action => {
    // eslint-disable-next-line no-console
    console.log(action);
    next(action);
};

export default () => {
    const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(
                logger,
                epicMiddleware,
            ),
        ),
    );

    epicMiddleware.run(epic);

    return store;
};
