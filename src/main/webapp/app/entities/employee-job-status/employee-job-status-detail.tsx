import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-job-status.reducer';
import { IEmployeeJobStatus } from 'app/shared/model/employee-job-status.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeJobStatusDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeJobStatusDetail = (props: IEmployeeJobStatusDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeJobStatusEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeJobStatus.detail.title">EmployeeJobStatus</Translate> [
          <b>{employeeJobStatusEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="jobStatusEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatusEfDate">Job Status Ef Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.jobStatusEfDate ? (
              <TextFormat value={employeeJobStatusEntity.jobStatusEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="jobBaseEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.jobBaseEfDate">Job Base Ef Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.jobBaseEfDate ? (
              <TextFormat value={employeeJobStatusEntity.jobBaseEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="employmentCatEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCatEfDate">Employment Cat Ef Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.employmentCatEfDate ? (
              <TextFormat value={employeeJobStatusEntity.employmentCatEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="designationEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.designationEfDate">Designation Ef Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.designationEfDate ? (
              <TextFormat value={employeeJobStatusEntity.designationEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="jobLevelEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevelEfDate">Job Level Ef Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.jobLevelEfDate ? (
              <TextFormat value={employeeJobStatusEntity.jobLevelEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="functionalDesignationEfDate">
              <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignationEfDate">
                Functional Designation Ef Date
              </Translate>
            </span>
          </dt>
          <dd>
            {employeeJobStatusEntity.functionalDesignationEfDate ? (
              <TextFormat value={employeeJobStatusEntity.functionalDesignationEfDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatus">Job Status</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.jobStatus ? employeeJobStatusEntity.jobStatus.description : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.jobBase">Job Base</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.jobBase ? employeeJobStatusEntity.jobBase.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCategory">Employment Category</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.employmentCategory ? employeeJobStatusEntity.employmentCategory.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.designation">Designation</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.designation ? employeeJobStatusEntity.designation.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevel">Job Level</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.jobLevel ? employeeJobStatusEntity.jobLevel.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignation">Functional Designation</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.functionalDesignation ? employeeJobStatusEntity.functionalDesignation.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeJobStatus.employee">Employee</Translate>
          </dt>
          <dd>{employeeJobStatusEntity.employee ? employeeJobStatusEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-job-status" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-job-status/${employeeJobStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeJobStatus }: IRootState) => ({
  employeeJobStatusEntity: employeeJobStatus.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeJobStatusDetail);
