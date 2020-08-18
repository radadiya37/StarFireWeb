import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-employment.reducer';
import { IEmployeeEmployment } from 'app/shared/model/employee-employment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeEmploymentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeEmploymentDetail = (props: IEmployeeEmploymentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEmploymentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeEmployment.detail.title">EmployeeEmployment</Translate> [
          <b>{employeeEmploymentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="companyName">
              <Translate contentKey="starfirewebApp.employeeEmployment.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{employeeEmploymentEntity.companyName}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="starfirewebApp.employeeEmployment.address">Address</Translate>
            </span>
          </dt>
          <dd>{employeeEmploymentEntity.address}</dd>
          <dt>
            <span id="jobTitle">
              <Translate contentKey="starfirewebApp.employeeEmployment.jobTitle">Job Title</Translate>
            </span>
          </dt>
          <dd>{employeeEmploymentEntity.jobTitle}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="starfirewebApp.employeeEmployment.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeEmploymentEntity.startDate ? (
              <TextFormat value={employeeEmploymentEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="starfirewebApp.employeeEmployment.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeEmploymentEntity.endDate ? (
              <TextFormat value={employeeEmploymentEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastSalary">
              <Translate contentKey="starfirewebApp.employeeEmployment.lastSalary">Last Salary</Translate>
            </span>
          </dt>
          <dd>{employeeEmploymentEntity.lastSalary}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeEmployment.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeEmploymentEntity.remarks}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeEmployment.employee">Employee</Translate>
          </dt>
          <dd>{employeeEmploymentEntity.employee ? employeeEmploymentEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-employment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-employment/${employeeEmploymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeEmployment }: IRootState) => ({
  employeeEmploymentEntity: employeeEmployment.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEmploymentDetail);
