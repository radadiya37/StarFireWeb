import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TalentType from './talent-type';
import TalentTypeDetail from './talent-type-detail';
import TalentTypeUpdate from './talent-type-update';
import TalentTypeDeleteDialog from './talent-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TalentTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TalentTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TalentTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TalentType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TalentTypeDeleteDialog} />
  </>
);

export default Routes;
