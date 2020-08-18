import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-family.reducer';
import { IEmployeeFamily } from 'app/shared/model/employee-family.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeFamilyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeFamily = (props: IEmployeeFamilyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeFamilyList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-family-heading">
        <Translate contentKey="starfirewebApp.employeeFamily.home.title">Employee Families</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeFamily.home.createLabel">Create new Employee Family</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeFamilyList && employeeFamilyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.dob">Dob</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.nid">Nid</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.profession">Profession</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeFamily.employeeRelationship">Employee Relationship</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeFamilyList.map((employeeFamily, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeFamily.id}`} color="link" size="sm">
                      {employeeFamily.id}
                    </Button>
                  </td>
                  <td>{employeeFamily.name}</td>
                  <td>
                    {employeeFamily.dob ? <TextFormat type="date" value={employeeFamily.dob} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{employeeFamily.nid}</td>
                  <td>{employeeFamily.phone}</td>
                  <td>{employeeFamily.profession}</td>
                  <td>
                    <Translate contentKey={`starfirewebApp.Gender.${employeeFamily.gender}`} />
                  </td>
                  <td>
                    {employeeFamily.employeeRelationship ? (
                      <Link to={`personal-relationship/${employeeFamily.employeeRelationship.id}`}>
                        {employeeFamily.employeeRelationship.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeFamily.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeFamily.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeFamily.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeFamily.home.notFound">No Employee Families found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeFamily }: IRootState) => ({
  employeeFamilyList: employeeFamily.entities,
  loading: employeeFamily.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFamily);
