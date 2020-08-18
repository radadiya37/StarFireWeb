import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-job-status.reducer';
import { IEmployeeJobStatus } from 'app/shared/model/employee-job-status.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeJobStatusProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeJobStatus = (props: IEmployeeJobStatusProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeJobStatusList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-job-status-heading">
        <Translate contentKey="starfirewebApp.employeeJobStatus.home.title">Employee Job Statuses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeJobStatus.home.createLabel">Create new Employee Job Status</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeJobStatusList && employeeJobStatusList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatusEfDate">Job Status Ef Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobBaseEfDate">Job Base Ef Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCatEfDate">Employment Cat Ef Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.designationEfDate">Designation Ef Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevelEfDate">Job Level Ef Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignationEfDate">
                    Functional Designation Ef Date
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatus">Job Status</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobBase">Job Base</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCategory">Employment Category</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.designation">Designation</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevel">Job Level</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignation">Functional Designation</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeJobStatusList.map((employeeJobStatus, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeJobStatus.id}`} color="link" size="sm">
                      {employeeJobStatus.id}
                    </Button>
                  </td>
                  <td>
                    {employeeJobStatus.jobStatusEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.jobStatusEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.jobBaseEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.jobBaseEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.employmentCatEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.employmentCatEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.designationEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.designationEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.jobLevelEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.jobLevelEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.functionalDesignationEfDate ? (
                      <TextFormat type="date" value={employeeJobStatus.functionalDesignationEfDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeJobStatus.jobStatus ? (
                      <Link to={`job-status/${employeeJobStatus.jobStatus.id}`}>{employeeJobStatus.jobStatus.description}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.jobBase ? (
                      <Link to={`job-base/${employeeJobStatus.jobBase.id}`}>{employeeJobStatus.jobBase.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.employmentCategory ? (
                      <Link to={`employment-category/${employeeJobStatus.employmentCategory.id}`}>
                        {employeeJobStatus.employmentCategory.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.designation ? (
                      <Link to={`designation/${employeeJobStatus.designation.id}`}>{employeeJobStatus.designation.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.jobLevel ? (
                      <Link to={`job-level/${employeeJobStatus.jobLevel.id}`}>{employeeJobStatus.jobLevel.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.functionalDesignation ? (
                      <Link to={`functional-designation/${employeeJobStatus.functionalDesignation.id}`}>
                        {employeeJobStatus.functionalDesignation.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeJobStatus.employee ? (
                      <Link to={`employee-basic-info/${employeeJobStatus.employee.id}`}>{employeeJobStatus.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeJobStatus.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeJobStatus.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeJobStatus.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeJobStatus.home.notFound">No Employee Job Statuses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeJobStatus }: IRootState) => ({
  employeeJobStatusList: employeeJobStatus.entities,
  loading: employeeJobStatus.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeJobStatus);
