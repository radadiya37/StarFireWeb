import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TimeZone from './time-zone';
import TimeZoneDetail from './time-zone-detail';
import TimeZoneUpdate from './time-zone-update';
import TimeZoneDeleteDialog from './time-zone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimeZoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimeZoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimeZoneDetail} />
      <ErrorBoundaryRoute path={match.url} component={TimeZone} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TimeZoneDeleteDialog} />
  </>
);

export default Routes;
