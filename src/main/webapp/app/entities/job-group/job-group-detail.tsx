import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-group.reducer';
import { IJobGroup } from 'app/shared/model/job-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobGroupDetail = (props: IJobGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { jobGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.jobGroup.detail.title">JobGroup</Translate> [<b>{jobGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.jobGroup.name">Name</Translate>
            </span>
          </dt>
          <dd>{jobGroupEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.jobGroup.code">Code</Translate>
            </span>
          </dt>
          <dd>{jobGroupEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.jobGroup.description">Description</Translate>
            </span>
          </dt>
          <dd>{jobGroupEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.jobGroup.status">Status</Translate>
            </span>
          </dt>
          <dd>{jobGroupEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/job-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-group/${jobGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ jobGroup }: IRootState) => ({
  jobGroupEntity: jobGroup.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobGroupDetail);
