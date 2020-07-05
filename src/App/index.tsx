import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import {PagePreloader} from '@/pages';
import {Header} from '@/parts';

import styles from './styles.less';

const App = () => {
    return (
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <Suspense fallback={<PagePreloader />}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={React.lazy(() => import('../pages/Main/index'))}
                        />
                        <Route
                            exact
                            path="/doctors"
                            component={React.lazy(() => import('../pages/Doctors/index'))}
                        />
                        <Route
                            exact
                            path="/offers"
                            component={React.lazy(() => import('./../pages/Offers/index'))}
                        />
                        <Route
                            exact
                            path="/previews"
                            component={React.lazy(() => import('../pages/Previews/index'))}
                        />
                    </Switch>
                </Suspense>
            </div>
        </>
    );
};

export default App;
