import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './award-type.reducer';
import { IAwardType } from 'app/shared/model/award-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAwardTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AwardTypeDetail = (props: IAwardTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { awardTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.awardType.detail.title">AwardType</Translate> [<b>{awardTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="awardType">
              <Translate contentKey="starfirewebApp.awardType.awardType">Award Type</Translate>
            </span>
          </dt>
          <dd>{awardTypeEntity.awardType}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.awardType.description">Description</Translate>
            </span>
          </dt>
          <dd>{awardTypeEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/award-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/award-type/${awardTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ awardType }: IRootState) => ({
  awardTypeEntity: awardType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AwardTypeDetail);
