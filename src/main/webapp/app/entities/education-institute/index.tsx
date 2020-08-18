import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EducationInstitute from './education-institute';
import EducationInstituteDetail from './education-institute-detail';
import EducationInstituteUpdate from './education-institute-update';
import EducationInstituteDeleteDialog from './education-institute-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EducationInstituteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EducationInstituteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EducationInstituteDetail} />
      <ErrorBoundaryRoute path={match.url} component={EducationInstitute} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EducationInstituteDeleteDialog} />
  </>
);

export default Routes;
