import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './designation.reducer';
import { IDesignation } from 'app/shared/model/designation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDesignationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DesignationDetail = (props: IDesignationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { designationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.designation.detail.title">Designation</Translate> [<b>{designationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.designation.name">Name</Translate>
            </span>
          </dt>
          <dd>{designationEntity.name}</dd>
          <dt>
            <span id="shortName">
              <Translate contentKey="starfirewebApp.designation.shortName">Short Name</Translate>
            </span>
          </dt>
          <dd>{designationEntity.shortName}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.designation.code">Code</Translate>
            </span>
          </dt>
          <dd>{designationEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.designation.description">Description</Translate>
            </span>
          </dt>
          <dd>{designationEntity.description}</dd>
          <dt>
            <span id="position">
              <Translate contentKey="starfirewebApp.designation.position">Position</Translate>
            </span>
          </dt>
          <dd>{designationEntity.position}</dd>
          <dt>
            <span id="designationDate">
              <Translate contentKey="starfirewebApp.designation.designationDate">Designation Date</Translate>
            </span>
          </dt>
          <dd>
            {designationEntity.designationDate ? (
              <TextFormat value={designationEntity.designationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.designation.status">Status</Translate>
            </span>
          </dt>
          <dd>{designationEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.designation.designationGroup">Designation Group</Translate>
          </dt>
          <dd>{designationEntity.designationGroup ? designationEntity.designationGroup.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/designation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/designation/${designationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ designation }: IRootState) => ({
  designationEntity: designation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DesignationDetail);
