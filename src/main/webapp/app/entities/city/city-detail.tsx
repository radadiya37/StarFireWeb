import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CityDetail = (props: ICityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.city.detail.title">City</Translate> [<b>{cityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.city.name">Name</Translate>
            </span>
          </dt>
          <dd>{cityEntity.name}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.city.state">State</Translate>
          </dt>
          <dd>{cityEntity.state ? cityEntity.state.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.city.country">Country</Translate>
          </dt>
          <dd>{cityEntity.country ? cityEntity.country.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/city" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/city/${cityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ city }: IRootState) => ({
  cityEntity: city.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CityDetail);
