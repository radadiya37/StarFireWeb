import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-supervisor.reducer';
import { IEmployeeSupervisor } from 'app/shared/model/employee-supervisor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeSupervisorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeSupervisor = (props: IEmployeeSupervisorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeSupervisorList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-supervisor-heading">
        <Translate contentKey="starfirewebApp.employeeSupervisor.home.title">Employee Supervisors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeSupervisor.home.createLabel">Create new Employee Supervisor</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeSupervisorList && employeeSupervisorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeSupervisor.isDirectSupervisor">Is Direct Supervisor</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeSupervisor.effectiveDate">Effective Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeSupervisor.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeSupervisor.supervisor">Supervisor</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeSupervisorList.map((employeeSupervisor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeSupervisor.id}`} color="link" size="sm">
                      {employeeSupervisor.id}
                    </Button>
                  </td>
                  <td>{employeeSupervisor.isDirectSupervisor ? 'true' : 'false'}</td>
                  <td>
                    {employeeSupervisor.effectiveDate ? (
                      <TextFormat type="date" value={employeeSupervisor.effectiveDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeSupervisor.employee ? (
                      <Link to={`employee-basic-info/${employeeSupervisor.employee.id}`}>{employeeSupervisor.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeSupervisor.supervisor ? (
                      <Link to={`employee-basic-info/${employeeSupervisor.supervisor.id}`}>{employeeSupervisor.supervisor.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeSupervisor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeSupervisor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeSupervisor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeSupervisor.home.notFound">No Employee Supervisors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeSupervisor }: IRootState) => ({
  employeeSupervisorList: employeeSupervisor.entities,
  loading: employeeSupervisor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSupervisor);
