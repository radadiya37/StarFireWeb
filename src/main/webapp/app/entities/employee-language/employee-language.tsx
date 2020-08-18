import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-language.reducer';
import { IEmployeeLanguage } from 'app/shared/model/employee-language.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeLanguageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeLanguage = (props: IEmployeeLanguageProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeLanguageList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-language-heading">
        <Translate contentKey="starfirewebApp.employeeLanguage.home.title">Employee Languages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeLanguage.home.createLabel">Create new Employee Language</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeLanguageList && employeeLanguageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeLanguage.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeLanguage.language">Language</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeLanguage.languageProficiency">Language Proficiency</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeLanguageList.map((employeeLanguage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeLanguage.id}`} color="link" size="sm">
                      {employeeLanguage.id}
                    </Button>
                  </td>
                  <td>
                    {employeeLanguage.employee ? (
                      <Link to={`employee-basic-info/${employeeLanguage.employee.id}`}>{employeeLanguage.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeLanguage.language ? (
                      <Link to={`language/${employeeLanguage.language.id}`}>{employeeLanguage.language.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeLanguage.languageProficiency ? (
                      <Link to={`language-proficiency/${employeeLanguage.languageProficiency.id}`}>
                        {employeeLanguage.languageProficiency.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeLanguage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeLanguage.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeLanguage.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="starfirewebApp.employeeLanguage.home.notFound">No Employee Languages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeLanguage }: IRootState) => ({
  employeeLanguageList: employeeLanguage.entities,
  loading: employeeLanguage.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLanguage);
