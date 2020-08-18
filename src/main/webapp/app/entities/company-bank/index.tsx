import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompanyBank from './company-bank';
import CompanyBankDetail from './company-bank-detail';
import CompanyBankUpdate from './company-bank-update';
import CompanyBankDeleteDialog from './company-bank-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompanyBankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompanyBankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompanyBankDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompanyBank} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompanyBankDeleteDialog} />
  </>
);

export default Routes;
