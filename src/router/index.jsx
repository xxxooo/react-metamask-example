import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import EthereumRoute from './EthereumRoute';
import Loader from '../components/Loader';

const Root = lazy(() => import('../views/Root'));
const Account = lazy(() => import('../views/Account'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={Root} />
          <EthereumRoute>
            <Route path="/account" exact component={Account} />
            <Redirect to='/account' />
          </EthereumRoute>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
