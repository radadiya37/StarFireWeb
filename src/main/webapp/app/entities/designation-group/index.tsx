import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DesignationGroup from './designation-group';
import DesignationGroupDetail from './designation-group-detail';
import DesignationGroupUpdate from './designation-group-update';
import DesignationGroupDeleteDialog from './designation-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DesignationGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DesignationGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DesignationGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={DesignationGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DesignationGroupDeleteDialog} />
  </>
);

export default Routes;
