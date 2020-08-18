import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JobBase from './job-base';
import JobBaseDetail from './job-base-detail';
import JobBaseUpdate from './job-base-update';
import JobBaseDeleteDialog from './job-base-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobBaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobBaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobBaseDetail} />
      <ErrorBoundaryRoute path={match.url} component={JobBase} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobBaseDeleteDialog} />
  </>
);

export default Routes;
