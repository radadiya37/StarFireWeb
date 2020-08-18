import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-warning.reducer';
import { IEmployeeWarning } from 'app/shared/model/employee-warning.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeWarningProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeWarning = (props: IEmployeeWarningProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeWarningList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-warning-heading">
        <Translate contentKey="starfirewebApp.employeeWarning.home.title">Employee Warnings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeWarning.home.createLabel">Create new Employee Warning</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeWarningList && employeeWarningList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.warning">Warning</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.action">Action</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.isActionType">Is Action Type</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.warningDate">Warning Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.warnedEmployee">Warned Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.warnedBy">Warned By</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeWarning.warningType">Warning Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeWarningList.map((employeeWarning, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeWarning.id}`} color="link" size="sm">
                      {employeeWarning.id}
                    </Button>
                  </td>
                  <td>{employeeWarning.warning}</td>
                  <td>{employeeWarning.action}</td>
                  <td>{employeeWarning.remarks}</td>
                  <td>{employeeWarning.isActionType ? 'true' : 'false'}</td>
                  <td>
                    {employeeWarning.warningDate ? (
                      <TextFormat type="date" value={employeeWarning.warningDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeWarning.warnedEmployee ? (
                      <Link to={`employee-basic-info/${employeeWarning.warnedEmployee.id}`}>{employeeWarning.warnedEmployee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeWarning.warnedBy ? (
                      <Link to={`employee-basic-info/${employeeWarning.warnedBy.id}`}>{employeeWarning.warnedBy.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeWarning.warningType ? (
                      <Link to={`warning-type/${employeeWarning.warningType.id}`}>{employeeWarning.warningType.warningType}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeWarning.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeWarning.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeWarning.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeWarning.home.notFound">No Employee Warnings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeWarning }: IRootState) => ({
  employeeWarningList: employeeWarning.entities,
  loading: employeeWarning.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWarning);
