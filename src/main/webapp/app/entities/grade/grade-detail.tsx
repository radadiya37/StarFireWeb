import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './grade.reducer';
import { IGrade } from 'app/shared/model/grade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGradeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GradeDetail = (props: IGradeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gradeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.grade.detail.title">Grade</Translate> [<b>{gradeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.grade.name">Name</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.name}</dd>
          <dt>
            <span id="point">
              <Translate contentKey="starfirewebApp.grade.point">Point</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.point}</dd>
          <dt>
            <span id="serial">
              <Translate contentKey="starfirewebApp.grade.serial">Serial</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.serial}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.grade.description">Description</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/grade" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/grade/${gradeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ grade }: IRootState) => ({
  gradeEntity: grade.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GradeDetail);
