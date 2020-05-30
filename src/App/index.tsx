import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import {PagePreloader} from '@/pages';

const App = () => {
    return (
        <Suspense fallback={<PagePreloader />}>
            <Switch>
                <Route
                    path="/doctors"
                    component={React.lazy(() => import('./../pages/Doctors/index'))}
                />
                <Route
                    path="/offers"
                    component={React.lazy(() => import('./../pages/Offers/index'))}
                />
                <Route
                    path="/offersPreviews"
                    component={React.lazy(() => import('./../pages/OfferPreviews/index'))}
                />
            </Switch>
        </Suspense>
    );
};

export default App;
