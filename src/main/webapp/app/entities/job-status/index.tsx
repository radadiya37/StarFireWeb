import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JobStatus from './job-status';
import JobStatusDetail from './job-status-detail';
import JobStatusUpdate from './job-status-update';
import JobStatusDeleteDialog from './job-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={JobStatus} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobStatusDeleteDialog} />
  </>
);

export default Routes;
