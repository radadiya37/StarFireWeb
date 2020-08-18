import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-status.reducer';
import { IJobStatus } from 'app/shared/model/job-status.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobStatusDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobStatusDetail = (props: IJobStatusDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { jobStatusEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.jobStatus.detail.title">JobStatus</Translate> [<b>{jobStatusEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.jobStatus.code">Code</Translate>
            </span>
          </dt>
          <dd>{jobStatusEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.jobStatus.description">Description</Translate>
            </span>
          </dt>
          <dd>{jobStatusEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.jobStatus.status">Status</Translate>
            </span>
          </dt>
          <dd>{jobStatusEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/job-status" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-status/${jobStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ jobStatus }: IRootState) => ({
  jobStatusEntity: jobStatus.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobStatusDetail);
