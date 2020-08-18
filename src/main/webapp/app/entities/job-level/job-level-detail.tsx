import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-level.reducer';
import { IJobLevel } from 'app/shared/model/job-level.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobLevelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobLevelDetail = (props: IJobLevelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { jobLevelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.jobLevel.detail.title">JobLevel</Translate> [<b>{jobLevelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.jobLevel.name">Name</Translate>
            </span>
          </dt>
          <dd>{jobLevelEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.jobLevel.description">Description</Translate>
            </span>
          </dt>
          <dd>{jobLevelEntity.description}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.jobLevel.code">Code</Translate>
            </span>
          </dt>
          <dd>{jobLevelEntity.code}</dd>
          <dt>
            <span id="position">
              <Translate contentKey="starfirewebApp.jobLevel.position">Position</Translate>
            </span>
          </dt>
          <dd>{jobLevelEntity.position}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.jobLevel.status">Status</Translate>
            </span>
          </dt>
          <dd>{jobLevelEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/job-level" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-level/${jobLevelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ jobLevel }: IRootState) => ({
  jobLevelEntity: jobLevel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobLevelDetail);
