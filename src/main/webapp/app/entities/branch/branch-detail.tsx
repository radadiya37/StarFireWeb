import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBranchDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BranchDetail = (props: IBranchDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { branchEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.branch.detail.title">Branch</Translate> [<b>{branchEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.branch.name">Name</Translate>
            </span>
          </dt>
          <dd>{branchEntity.name}</dd>
          <dt>
            <span id="isRemoteAttendanceAllowed">
              <Translate contentKey="starfirewebApp.branch.isRemoteAttendanceAllowed">Is Remote Attendance Allowed</Translate>
            </span>
          </dt>
          <dd>{branchEntity.isRemoteAttendanceAllowed ? 'true' : 'false'}</dd>
          <dt>
            <span id="radiusInMeter">
              <Translate contentKey="starfirewebApp.branch.radiusInMeter">Radius In Meter</Translate>
            </span>
          </dt>
          <dd>{branchEntity.radiusInMeter}</dd>
          <dt>
            <span id="isHeadOffice">
              <Translate contentKey="starfirewebApp.branch.isHeadOffice">Is Head Office</Translate>
            </span>
          </dt>
          <dd>{branchEntity.isHeadOffice ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.branch.timeZone">Time Zone</Translate>
          </dt>
          <dd>{branchEntity.timeZone ? branchEntity.timeZone.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/branch" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/branch/${branchEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ branch }: IRootState) => ({
  branchEntity: branch.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BranchDetail);
