import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const City = (props: ICityProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { cityList, match, loading } = props;
  return (
    <div>
      <h2 id="city-heading">
        <Translate contentKey="starfirewebApp.city.home.title">Cities</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.city.home.createLabel">Create new City</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {cityList && cityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.city.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.city.state">State</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.city.country">Country</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cityList.map((city, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${city.id}`} color="link" size="sm">
                      {city.id}
                    </Button>
                  </td>
                  <td>{city.name}</td>
                  <td>{city.state ? <Link to={`state/${city.state.id}`}>{city.state.name}</Link> : ''}</td>
                  <td>{city.country ? <Link to={`country/${city.country.id}`}>{city.country.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${city.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${city.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="starfirewebApp.city.home.notFound">No Cities found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities,
  loading: city.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(City);
