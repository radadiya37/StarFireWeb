import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DocumentCategory from './document-category';
import DocumentCategoryDetail from './document-category-detail';
import DocumentCategoryUpdate from './document-category-update';
import DocumentCategoryDeleteDialog from './document-category-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DocumentCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DocumentCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DocumentCategoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={DocumentCategory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DocumentCategoryDeleteDialog} />
  </>
);

export default Routes;
