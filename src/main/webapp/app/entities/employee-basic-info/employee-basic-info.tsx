import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-basic-info.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBasicInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeBasicInfo = (props: IEmployeeBasicInfoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeBasicInfoList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-basic-info-heading">
        <Translate contentKey="starfirewebApp.employeeBasicInfo.home.title">Employee Basic Infos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeBasicInfo.home.createLabel">Create new Employee Basic Info</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeBasicInfoList && employeeBasicInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.dob">Dob</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.personalEmail">Personal Email</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.telephone">Telephone</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.nationality">Nationality</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.photoPath">Photo Path</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.joinDate">Join Date</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.reviewMonth">Review Month</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.religion">Religion</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.maritalStatus">Marital Status</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.bloodGroup">Blood Group</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeBasicInfoList.map((employeeBasicInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeBasicInfo.id}`} color="link" size="sm">
                      {employeeBasicInfo.id}
                    </Button>
                  </td>
                  <td>{employeeBasicInfo.code}</td>
                  <td>
                    {employeeBasicInfo.dob ? <TextFormat type="date" value={employeeBasicInfo.dob} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{employeeBasicInfo.personalEmail}</td>
                  <td>{employeeBasicInfo.phone}</td>
                  <td>{employeeBasicInfo.telephone}</td>
                  <td>{employeeBasicInfo.nationality}</td>
                  <td>{employeeBasicInfo.photoPath}</td>
                  <td>{employeeBasicInfo.status ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`starfirewebApp.Gender.${employeeBasicInfo.gender}`} />
                  </td>
                  <td>
                    {employeeBasicInfo.joinDate ? (
                      <TextFormat type="date" value={employeeBasicInfo.joinDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`starfirewebApp.Month.${employeeBasicInfo.reviewMonth}`} />
                  </td>
                  <td>{employeeBasicInfo.user ? employeeBasicInfo.user.id : ''}</td>
                  <td>
                    {employeeBasicInfo.religion ? (
                      <Link to={`religion/${employeeBasicInfo.religion.id}`}>{employeeBasicInfo.religion.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeBasicInfo.maritalStatus ? (
                      <Link to={`marital-status/${employeeBasicInfo.maritalStatus.id}`}>{employeeBasicInfo.maritalStatus.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeBasicInfo.bloodGroup ? (
                      <Link to={`blood-group/${employeeBasicInfo.bloodGroup.id}`}>{employeeBasicInfo.bloodGroup.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeBasicInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBasicInfo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBasicInfo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.employeeBasicInfo.home.notFound">No Employee Basic Infos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeBasicInfo }: IRootState) => ({
  employeeBasicInfoList: employeeBasicInfo.entities,
  loading: employeeBasicInfo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBasicInfo);
