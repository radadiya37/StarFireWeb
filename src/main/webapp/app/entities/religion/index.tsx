import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Religion from './religion';
import ReligionDetail from './religion-detail';
import ReligionUpdate from './religion-update';
import ReligionDeleteDialog from './religion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReligionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReligionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReligionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Religion} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReligionDeleteDialog} />
  </>
);

export default Routes;
