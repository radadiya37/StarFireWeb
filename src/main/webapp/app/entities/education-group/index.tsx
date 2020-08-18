import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EducationGroup from './education-group';
import EducationGroupDetail from './education-group-detail';
import EducationGroupUpdate from './education-group-update';
import EducationGroupDeleteDialog from './education-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EducationGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EducationGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EducationGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={EducationGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EducationGroupDeleteDialog} />
  </>
);

export default Routes;
