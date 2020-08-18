import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FunctionalDesignation from './functional-designation';
import FunctionalDesignationDetail from './functional-designation-detail';
import FunctionalDesignationUpdate from './functional-designation-update';
import FunctionalDesignationDeleteDialog from './functional-designation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FunctionalDesignationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FunctionalDesignationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FunctionalDesignationDetail} />
      <ErrorBoundaryRoute path={match.url} component={FunctionalDesignation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FunctionalDesignationDeleteDialog} />
  </>
);

export default Routes;
