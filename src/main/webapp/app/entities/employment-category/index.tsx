import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmploymentCategory from './employment-category';
import EmploymentCategoryDetail from './employment-category-detail';
import EmploymentCategoryUpdate from './employment-category-update';
import EmploymentCategoryDeleteDialog from './employment-category-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmploymentCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmploymentCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmploymentCategoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmploymentCategory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmploymentCategoryDeleteDialog} />
  </>
);

export default Routes;
