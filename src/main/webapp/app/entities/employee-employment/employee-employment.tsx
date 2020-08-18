import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-employment.reducer';
import { IEmployeeEmployment } from 'app/shared/model/employee-employment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeEmploymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeEmployment = (props: IEmployeeEmploymentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeEmploymentList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-employment-heading">
        <Translate contentKey="starfirewebApp.employeeEmployment.home.title">Employee Employments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeEmployment.home.createLabel">Create new Employee Employment</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeEmploymentList && employeeEmploymentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.companyName">Company Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.jobTitle">Job Title</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.lastSalary">Last Salary</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEmployment.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeEmploymentList.map((employeeEmployment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeEmployment.id}`} color="link" size="sm">
                      {employeeEmployment.id}
                    </Button>
                  </td>
                  <td>{employeeEmployment.companyName}</td>
                  <td>{employeeEmployment.address}</td>
                  <td>{employeeEmployment.jobTitle}</td>
                  <td>
                    {employeeEmployment.startDate ? (
                      <TextFormat type="date" value={employeeEmployment.startDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeEmployment.endDate ? (
                      <TextFormat type="date" value={employeeEmployment.endDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{employeeEmployment.lastSalary}</td>
                  <td>{employeeEmployment.remarks}</td>
                  <td>
                    {employeeEmployment.employee ? (
                      <Link to={`employee-basic-info/${employeeEmployment.employee.id}`}>{employeeEmployment.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeEmployment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeEmployment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeEmployment.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeEmployment.home.notFound">No Employee Employments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeEmployment }: IRootState) => ({
  employeeEmploymentList: employeeEmployment.entities,
  loading: employeeEmployment.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEmployment);
