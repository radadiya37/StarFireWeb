import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-address.reducer';
import { IEmployeeAddress } from 'app/shared/model/employee-address.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeAddressProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeAddress = (props: IEmployeeAddressProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeAddressList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-address-heading">
        <Translate contentKey="starfirewebApp.employeeAddress.home.title">Employee Addresses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeAddress.home.createLabel">Create new Employee Address</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeAddressList && employeeAddressList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeAddress.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeAddress.presentAddress">Present Address</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeAddress.permanentAddress">Permanent Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeAddressList.map((employeeAddress, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeAddress.id}`} color="link" size="sm">
                      {employeeAddress.id}
                    </Button>
                  </td>
                  <td>
                    {employeeAddress.employee ? (
                      <Link to={`employee-basic-info/${employeeAddress.employee.id}`}>{employeeAddress.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeAddress.presentAddress ? (
                      <Link to={`address/${employeeAddress.presentAddress.id}`}>{employeeAddress.presentAddress.address}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeAddress.permanentAddress ? (
                      <Link to={`address/${employeeAddress.permanentAddress.id}`}>{employeeAddress.permanentAddress.address}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeAddress.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeAddress.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeAddress.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeAddress.home.notFound">No Employee Addresses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeAddress }: IRootState) => ({
  employeeAddressList: employeeAddress.entities,
  loading: employeeAddress.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddress);
