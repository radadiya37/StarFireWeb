import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-base.reducer';
import { IJobBase } from 'app/shared/model/job-base.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobBaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobBaseDetail = (props: IJobBaseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { jobBaseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.jobBase.detail.title">JobBase</Translate> [<b>{jobBaseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.jobBase.name">Name</Translate>
            </span>
          </dt>
          <dd>{jobBaseEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.jobBase.code">Code</Translate>
            </span>
          </dt>
          <dd>{jobBaseEntity.code}</dd>
          <dt>
            <span id="isSystemReserved">
              <Translate contentKey="starfirewebApp.jobBase.isSystemReserved">Is System Reserved</Translate>
            </span>
          </dt>
          <dd>{jobBaseEntity.isSystemReserved ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/job-base" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-base/${jobBaseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ jobBase }: IRootState) => ({
  jobBaseEntity: jobBase.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobBaseDetail);
