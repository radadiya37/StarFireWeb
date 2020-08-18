import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-passport.reducer';
import { IEmployeePassport } from 'app/shared/model/employee-passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeePassportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeePassport = (props: IEmployeePassportProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeePassportList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-passport-heading">
        <Translate contentKey="starfirewebApp.employeePassport.home.title">Employee Passports</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeePassport.home.createLabel">Create new Employee Passport</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeePassportList && employeePassportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.passportType">Passport Type</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.passportNo">Passport No</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.expireDate">Expire Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeePassport.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeePassportList.map((employeePassport, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeePassport.id}`} color="link" size="sm">
                      {employeePassport.id}
                    </Button>
                  </td>
                  <td>{employeePassport.passportType}</td>
                  <td>{employeePassport.passportNo}</td>
                  <td>
                    {employeePassport.issueDate ? (
                      <TextFormat type="date" value={employeePassport.issueDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeePassport.expireDate ? (
                      <TextFormat type="date" value={employeePassport.expireDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeePassport.country ? (
                      <Link to={`country/${employeePassport.country.id}`}>{employeePassport.country.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeePassport.employee ? (
                      <Link to={`employee-basic-info/${employeePassport.employee.id}`}>{employeePassport.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeePassport.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeePassport.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeePassport.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeePassport.home.notFound">No Employee Passports found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeePassport }: IRootState) => ({
  employeePassportList: employeePassport.entities,
  loading: employeePassport.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePassport);
