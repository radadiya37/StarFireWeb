import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LanguageProficiency from './language-proficiency';
import LanguageProficiencyDetail from './language-proficiency-detail';
import LanguageProficiencyUpdate from './language-proficiency-update';
import LanguageProficiencyDeleteDialog from './language-proficiency-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LanguageProficiencyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LanguageProficiencyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LanguageProficiencyDetail} />
      <ErrorBoundaryRoute path={match.url} component={LanguageProficiency} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LanguageProficiencyDeleteDialog} />
  </>
);

export default Routes;
