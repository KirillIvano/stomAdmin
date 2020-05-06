import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {
    PagePreloader,
} from '@/pages';

const App = () => {
    return (
        <div>
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
        </div>
    );
};

export default App;
