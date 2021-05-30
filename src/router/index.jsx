import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loader from '../components/Loader'

const Root = lazy(() => import('../views/Root'));
const Account = lazy(() => import('../views/Account'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={Root} />
          <Route path="/account" exact component={Account} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
