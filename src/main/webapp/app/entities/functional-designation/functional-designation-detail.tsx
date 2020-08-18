import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './functional-designation.reducer';
import { IFunctionalDesignation } from 'app/shared/model/functional-designation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFunctionalDesignationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FunctionalDesignationDetail = (props: IFunctionalDesignationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { functionalDesignationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.functionalDesignation.detail.title">FunctionalDesignation</Translate> [
          <b>{functionalDesignationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.functionalDesignation.name">Name</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.functionalDesignation.code">Code</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.code}</dd>
          <dt>
            <span id="position">
              <Translate contentKey="starfirewebApp.functionalDesignation.position">Position</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.position}</dd>
          <dt>
            <span id="shortName">
              <Translate contentKey="starfirewebApp.functionalDesignation.shortName">Short Name</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.shortName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.functionalDesignation.description">Description</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.description}</dd>
          <dt>
            <span id="designationDate">
              <Translate contentKey="starfirewebApp.functionalDesignation.designationDate">Designation Date</Translate>
            </span>
          </dt>
          <dd>
            {functionalDesignationEntity.designationDate ? (
              <TextFormat value={functionalDesignationEntity.designationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.functionalDesignation.status">Status</Translate>
            </span>
          </dt>
          <dd>{functionalDesignationEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/functional-designation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/functional-designation/${functionalDesignationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ functionalDesignation }: IRootState) => ({
  functionalDesignationEntity: functionalDesignation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalDesignationDetail);
