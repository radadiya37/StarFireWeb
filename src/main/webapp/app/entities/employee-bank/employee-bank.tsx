import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-bank.reducer';
import { IEmployeeBank } from 'app/shared/model/employee-bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBankProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeBank = (props: IEmployeeBankProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeBankList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-bank-heading">
        <Translate contentKey="starfirewebApp.employeeBank.home.title">Employee Banks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeBank.home.createLabel">Create new Employee Bank</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeBankList && employeeBankList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.routingCode">Routing Code</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.accountNo">Account No</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBank.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeBankList.map((employeeBank, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeBank.id}`} color="link" size="sm">
                      {employeeBank.id}
                    </Button>
                  </td>
                  <td>{employeeBank.name}</td>
                  <td>{employeeBank.routingCode}</td>
                  <td>{employeeBank.accountNo}</td>
                  <td>{employeeBank.accountName}</td>
                  <td>{employeeBank.remarks}</td>
                  <td>
                    {employeeBank.employee ? (
                      <Link to={`employee-basic-info/${employeeBank.employee.id}`}>{employeeBank.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeBank.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBank.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBank.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeBank.home.notFound">No Employee Banks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeBank }: IRootState) => ({
  employeeBankList: employeeBank.entities,
  loading: employeeBank.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBank);
