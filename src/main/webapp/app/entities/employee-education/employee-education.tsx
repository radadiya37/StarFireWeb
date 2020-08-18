import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-education.reducer';
import { IEmployeeEducation } from 'app/shared/model/employee-education.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeEducationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeEducation = (props: IEmployeeEducationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeEducationList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-education-heading">
        <Translate contentKey="starfirewebApp.employeeEducation.home.title">Employee Educations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeEducation.home.createLabel">Create new Employee Education</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeEducationList && employeeEducationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.passedYear">Passed Year</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.cgpa">Cgpa</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.scale">Scale</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.hasForeignDegree">Has Foreign Degree</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.isProfessional">Is Professional</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.isLastEducation">Is Last Education</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.education">Education</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.grade">Grade</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.institute">Institute</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeEducation.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeEducationList.map((employeeEducation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeEducation.id}`} color="link" size="sm">
                      {employeeEducation.id}
                    </Button>
                  </td>
                  <td>{employeeEducation.passedYear}</td>
                  <td>{employeeEducation.cgpa}</td>
                  <td>{employeeEducation.scale}</td>
                  <td>{employeeEducation.hasForeignDegree ? 'true' : 'false'}</td>
                  <td>{employeeEducation.isProfessional ? 'true' : 'false'}</td>
                  <td>{employeeEducation.isLastEducation ? 'true' : 'false'}</td>
                  <td>
                    {employeeEducation.education ? (
                      <Link to={`education/${employeeEducation.education.id}`}>{employeeEducation.education.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeEducation.grade ? <Link to={`grade/${employeeEducation.grade.id}`}>{employeeEducation.grade.name}</Link> : ''}
                  </td>
                  <td>
                    {employeeEducation.institute ? (
                      <Link to={`education-institute/${employeeEducation.institute.id}`}>{employeeEducation.institute.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeEducation.employee ? (
                      <Link to={`employee-basic-info/${employeeEducation.employee.id}`}>{employeeEducation.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeEducation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeEducation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeEducation.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeEducation.home.notFound">No Employee Educations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeEducation }: IRootState) => ({
  employeeEducationList: employeeEducation.entities,
  loading: employeeEducation.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEducation);
