import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-division.reducer';
import { IEmployeeDivision } from 'app/shared/model/employee-division.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDivisionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeDivision = (props: IEmployeeDivisionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeDivisionList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-division-heading">
        <Translate contentKey="starfirewebApp.employeeDivision.home.title">Employee Divisions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeDivision.home.createLabel">Create new Employee Division</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeDivisionList && employeeDivisionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.effectiveDate">Effective Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.division">Division</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.department">Department</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.branch">Branch</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.unit">Unit</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDivision.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeDivisionList.map((employeeDivision, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeDivision.id}`} color="link" size="sm">
                      {employeeDivision.id}
                    </Button>
                  </td>
                  <td>
                    {employeeDivision.effectiveDate ? (
                      <TextFormat type="date" value={employeeDivision.effectiveDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {employeeDivision.division ? (
                      <Link to={`division/${employeeDivision.division.id}`}>{employeeDivision.division.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeDivision.department ? (
                      <Link to={`department/${employeeDivision.department.id}`}>{employeeDivision.department.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeDivision.branch ? <Link to={`branch/${employeeDivision.branch.id}`}>{employeeDivision.branch.name}</Link> : ''}
                  </td>
                  <td>{employeeDivision.unit ? <Link to={`unit/${employeeDivision.unit.id}`}>{employeeDivision.unit.name}</Link> : ''}</td>
                  <td>
                    {employeeDivision.employee ? (
                      <Link to={`employee-basic-info/${employeeDivision.employee.id}`}>{employeeDivision.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeDivision.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeDivision.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeDivision.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeDivision.home.notFound">No Employee Divisions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeDivision }: IRootState) => ({
  employeeDivisionList: employeeDivision.entities,
  loading: employeeDivision.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDivision);
