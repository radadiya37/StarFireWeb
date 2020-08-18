import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JobLevel from './job-level';
import JobLevelDetail from './job-level-detail';
import JobLevelUpdate from './job-level-update';
import JobLevelDeleteDialog from './job-level-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobLevelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobLevelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobLevelDetail} />
      <ErrorBoundaryRoute path={match.url} component={JobLevel} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobLevelDeleteDialog} />
  </>
);

export default Routes;
