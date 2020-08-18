import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AwardType from './award-type';
import AwardTypeDetail from './award-type-detail';
import AwardTypeUpdate from './award-type-update';
import AwardTypeDeleteDialog from './award-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AwardTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AwardTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AwardTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={AwardType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AwardTypeDeleteDialog} />
  </>
);

export default Routes;
