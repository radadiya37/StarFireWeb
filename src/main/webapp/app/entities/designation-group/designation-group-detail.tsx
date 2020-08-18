import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './designation-group.reducer';
import { IDesignationGroup } from 'app/shared/model/designation-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDesignationGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DesignationGroupDetail = (props: IDesignationGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { designationGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.designationGroup.detail.title">DesignationGroup</Translate> [
          <b>{designationGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.designationGroup.name">Name</Translate>
            </span>
          </dt>
          <dd>{designationGroupEntity.name}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.designationGroup.status">Status</Translate>
            </span>
          </dt>
          <dd>{designationGroupEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/designation-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/designation-group/${designationGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ designationGroup }: IRootState) => ({
  designationGroupEntity: designationGroup.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DesignationGroupDetail);
