import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './warning-type.reducer';
import { IWarningType } from 'app/shared/model/warning-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarningTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WarningTypeDetail = (props: IWarningTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { warningTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.warningType.detail.title">WarningType</Translate> [<b>{warningTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="warningType">
              <Translate contentKey="starfirewebApp.warningType.warningType">Warning Type</Translate>
            </span>
          </dt>
          <dd>{warningTypeEntity.warningType}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.warningType.description">Description</Translate>
            </span>
          </dt>
          <dd>{warningTypeEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/warning-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/warning-type/${warningTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ warningType }: IRootState) => ({
  warningTypeEntity: warningType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WarningTypeDetail);
