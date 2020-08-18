import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './blood-group.reducer';
import { IBloodGroup } from 'app/shared/model/blood-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBloodGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BloodGroup = (props: IBloodGroupProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bloodGroupList, match, loading } = props;
  return (
    <div>
      <h2 id="blood-group-heading">
        <Translate contentKey="starfirewebApp.bloodGroup.home.title">Blood Groups</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.bloodGroup.home.createLabel">Create new Blood Group</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bloodGroupList && bloodGroupList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.bloodGroup.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bloodGroupList.map((bloodGroup, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bloodGroup.id}`} color="link" size="sm">
                      {bloodGroup.id}
                    </Button>
                  </td>
                  <td>{bloodGroup.name}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bloodGroup.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bloodGroup.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bloodGroup.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.bloodGroup.home.notFound">No Blood Groups found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bloodGroup }: IRootState) => ({
  bloodGroupList: bloodGroup.entities,
  loading: bloodGroup.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BloodGroup);
