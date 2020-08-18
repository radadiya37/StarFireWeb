import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './time-zone.reducer';
import { ITimeZone } from 'app/shared/model/time-zone.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimeZoneProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TimeZone = (props: ITimeZoneProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { timeZoneList, match, loading } = props;
  return (
    <div>
      <h2 id="time-zone-heading">
        <Translate contentKey="starfirewebApp.timeZone.home.title">Time Zones</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.timeZone.home.createLabel">Create new Time Zone</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {timeZoneList && timeZoneList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.timeZone.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timeZoneList.map((timeZone, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${timeZone.id}`} color="link" size="sm">
                      {timeZone.id}
                    </Button>
                  </td>
                  <td>{timeZone.name}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${timeZone.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeZone.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeZone.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.timeZone.home.notFound">No Time Zones found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ timeZone }: IRootState) => ({
  timeZoneList: timeZone.entities,
  loading: timeZone.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TimeZone);
