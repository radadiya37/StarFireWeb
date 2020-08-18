import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JobGroup from './job-group';
import JobGroupDetail from './job-group-detail';
import JobGroupUpdate from './job-group-update';
import JobGroupDeleteDialog from './job-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={JobGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobGroupDeleteDialog} />
  </>
);

export default Routes;
