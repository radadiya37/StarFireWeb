import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-basic-info.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBasicInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeBasicInfoDetail = (props: IEmployeeBasicInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeBasicInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeBasicInfo.detail.title">EmployeeBasicInfo</Translate> [
          <b>{employeeBasicInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.code">Code</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.code}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.dob">Dob</Translate>
            </span>
          </dt>
          <dd>
            {employeeBasicInfoEntity.dob ? (
              <TextFormat value={employeeBasicInfoEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="personalEmail">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.personalEmail">Personal Email</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.personalEmail}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.phone}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.telephone">Telephone</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.telephone}</dd>
          <dt>
            <span id="nationality">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.nationality">Nationality</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.nationality}</dd>
          <dt>
            <span id="photoPath">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.photoPath">Photo Path</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.photoPath}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.status">Status</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.gender}</dd>
          <dt>
            <span id="joinDate">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.joinDate">Join Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeBasicInfoEntity.joinDate ? (
              <TextFormat value={employeeBasicInfoEntity.joinDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reviewMonth">
              <Translate contentKey="starfirewebApp.employeeBasicInfo.reviewMonth">Review Month</Translate>
            </span>
          </dt>
          <dd>{employeeBasicInfoEntity.reviewMonth}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeBasicInfo.user">User</Translate>
          </dt>
          <dd>{employeeBasicInfoEntity.user ? employeeBasicInfoEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeBasicInfo.religion">Religion</Translate>
          </dt>
          <dd>{employeeBasicInfoEntity.religion ? employeeBasicInfoEntity.religion.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeBasicInfo.maritalStatus">Marital Status</Translate>
          </dt>
          <dd>{employeeBasicInfoEntity.maritalStatus ? employeeBasicInfoEntity.maritalStatus.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeBasicInfo.bloodGroup">Blood Group</Translate>
          </dt>
          <dd>{employeeBasicInfoEntity.bloodGroup ? employeeBasicInfoEntity.bloodGroup.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-basic-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-basic-info/${employeeBasicInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeBasicInfo }: IRootState) => ({
  employeeBasicInfoEntity: employeeBasicInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBasicInfoDetail);
