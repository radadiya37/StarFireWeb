import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBranchProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Branch = (props: IBranchProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { branchList, match, loading } = props;
  return (
    <div>
      <h2 id="branch-heading">
        <Translate contentKey="starfirewebApp.branch.home.title">Branches</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.branch.home.createLabel">Create new Branch</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {branchList && branchList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.branch.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.branch.isRemoteAttendanceAllowed">Is Remote Attendance Allowed</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.branch.radiusInMeter">Radius In Meter</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.branch.isHeadOffice">Is Head Office</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.branch.timeZone">Time Zone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {branchList.map((branch, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${branch.id}`} color="link" size="sm">
                      {branch.id}
                    </Button>
                  </td>
                  <td>{branch.name}</td>
                  <td>{branch.isRemoteAttendanceAllowed ? 'true' : 'false'}</td>
                  <td>{branch.radiusInMeter}</td>
                  <td>{branch.isHeadOffice ? 'true' : 'false'}</td>
                  <td>{branch.timeZone ? <Link to={`time-zone/${branch.timeZone.id}`}>{branch.timeZone.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${branch.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${branch.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${branch.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.branch.home.notFound">No Branches found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ branch }: IRootState) => ({
  branchList: branch.entities,
  loading: branch.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
