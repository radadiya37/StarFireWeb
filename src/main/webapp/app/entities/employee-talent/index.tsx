import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeTalent from './employee-talent';
import EmployeeTalentDetail from './employee-talent-detail';
import EmployeeTalentUpdate from './employee-talent-update';
import EmployeeTalentDeleteDialog from './employee-talent-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeTalentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeTalentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeTalentDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeTalent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeTalentDeleteDialog} />
  </>
);

export default Routes;
