import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BloodGroup from './blood-group';
import BloodGroupDetail from './blood-group-detail';
import BloodGroupUpdate from './blood-group-update';
import BloodGroupDeleteDialog from './blood-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BloodGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BloodGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BloodGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={BloodGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BloodGroupDeleteDialog} />
  </>
);

export default Routes;
