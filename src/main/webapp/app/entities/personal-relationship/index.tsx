import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PersonalRelationship from './personal-relationship';
import PersonalRelationshipDetail from './personal-relationship-detail';
import PersonalRelationshipUpdate from './personal-relationship-update';
import PersonalRelationshipDeleteDialog from './personal-relationship-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PersonalRelationshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PersonalRelationshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PersonalRelationshipDetail} />
      <ErrorBoundaryRoute path={match.url} component={PersonalRelationship} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PersonalRelationshipDeleteDialog} />
  </>
);

export default Routes;
