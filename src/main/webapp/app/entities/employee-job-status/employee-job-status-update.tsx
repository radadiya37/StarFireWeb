import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJobStatus } from 'app/shared/model/job-status.model';
import { getEntities as getJobStatuses } from 'app/entities/job-status/job-status.reducer';
import { IJobBase } from 'app/shared/model/job-base.model';
import { getEntities as getJobBases } from 'app/entities/job-base/job-base.reducer';
import { IEmploymentCategory } from 'app/shared/model/employment-category.model';
import { getEntities as getEmploymentCategories } from 'app/entities/employment-category/employment-category.reducer';
import { IDesignation } from 'app/shared/model/designation.model';
import { getEntities as getDesignations } from 'app/entities/designation/designation.reducer';
import { IJobLevel } from 'app/shared/model/job-level.model';
import { getEntities as getJobLevels } from 'app/entities/job-level/job-level.reducer';
import { IFunctionalDesignation } from 'app/shared/model/functional-designation.model';
import { getEntities as getFunctionalDesignations } from 'app/entities/functional-designation/functional-designation.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-job-status.reducer';
import { IEmployeeJobStatus } from 'app/shared/model/employee-job-status.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeJobStatusUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeJobStatusUpdate = (props: IEmployeeJobStatusUpdateProps) => {
  const [jobStatusId, setJobStatusId] = useState('0');
  const [jobBaseId, setJobBaseId] = useState('0');
  const [employmentCategoryId, setEmploymentCategoryId] = useState('0');
  const [designationId, setDesignationId] = useState('0');
  const [jobLevelId, setJobLevelId] = useState('0');
  const [functionalDesignationId, setFunctionalDesignationId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    employeeJobStatusEntity,
    jobStatuses,
    jobBases,
    employmentCategories,
    designations,
    jobLevels,
    functionalDesignations,
    employeeBasicInfos,
    loading,
    updating,
  } = props;

  const handleClose = () => {
    props.history.push('/employee-job-status');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getJobStatuses();
    props.getJobBases();
    props.getEmploymentCategories();
    props.getDesignations();
    props.getJobLevels();
    props.getFunctionalDesignations();
    props.getEmployeeBasicInfos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeJobStatusEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="starfirewebApp.employeeJobStatus.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeJobStatus.home.createOrEditLabel">Create or edit a EmployeeJobStatus</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeJobStatusEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-job-status-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-job-status-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="jobStatusEfDateLabel" for="employee-job-status-jobStatusEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatusEfDate">Job Status Ef Date</Translate>
                </Label>
                <AvField
                  id="employee-job-status-jobStatusEfDate"
                  type="date"
                  className="form-control"
                  name="jobStatusEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="jobBaseEfDateLabel" for="employee-job-status-jobBaseEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobBaseEfDate">Job Base Ef Date</Translate>
                </Label>
                <AvField
                  id="employee-job-status-jobBaseEfDate"
                  type="date"
                  className="form-control"
                  name="jobBaseEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="employmentCatEfDateLabel" for="employee-job-status-employmentCatEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCatEfDate">Employment Cat Ef Date</Translate>
                </Label>
                <AvField
                  id="employee-job-status-employmentCatEfDate"
                  type="date"
                  className="form-control"
                  name="employmentCatEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="designationEfDateLabel" for="employee-job-status-designationEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.designationEfDate">Designation Ef Date</Translate>
                </Label>
                <AvField
                  id="employee-job-status-designationEfDate"
                  type="date"
                  className="form-control"
                  name="designationEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="jobLevelEfDateLabel" for="employee-job-status-jobLevelEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevelEfDate">Job Level Ef Date</Translate>
                </Label>
                <AvField
                  id="employee-job-status-jobLevelEfDate"
                  type="date"
                  className="form-control"
                  name="jobLevelEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="functionalDesignationEfDateLabel" for="employee-job-status-functionalDesignationEfDate">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignationEfDate">
                    Functional Designation Ef Date
                  </Translate>
                </Label>
                <AvField
                  id="employee-job-status-functionalDesignationEfDate"
                  type="date"
                  className="form-control"
                  name="functionalDesignationEfDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-jobStatus">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobStatus">Job Status</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-jobStatus"
                  type="select"
                  className="form-control"
                  name="jobStatus.id"
                  value={isNew ? jobStatuses[0] && jobStatuses[0].id : employeeJobStatusEntity.jobStatus?.id}
                  required
                >
                  {jobStatuses
                    ? jobStatuses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.description}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-jobBase">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobBase">Job Base</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-jobBase"
                  type="select"
                  className="form-control"
                  name="jobBase.id"
                  value={isNew ? jobBases[0] && jobBases[0].id : employeeJobStatusEntity.jobBase?.id}
                  required
                >
                  {jobBases
                    ? jobBases.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-employmentCategory">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employmentCategory">Employment Category</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-employmentCategory"
                  type="select"
                  className="form-control"
                  name="employmentCategory.id"
                  value={isNew ? employmentCategories[0] && employmentCategories[0].id : employeeJobStatusEntity.employmentCategory?.id}
                  required
                >
                  {employmentCategories
                    ? employmentCategories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-designation">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.designation">Designation</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-designation"
                  type="select"
                  className="form-control"
                  name="designation.id"
                  value={isNew ? designations[0] && designations[0].id : employeeJobStatusEntity.designation?.id}
                  required
                >
                  {designations
                    ? designations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-jobLevel">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.jobLevel">Job Level</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-jobLevel"
                  type="select"
                  className="form-control"
                  name="jobLevel.id"
                  value={isNew ? jobLevels[0] && jobLevels[0].id : employeeJobStatusEntity.jobLevel?.id}
                  required
                >
                  {jobLevels
                    ? jobLevels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-functionalDesignation">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.functionalDesignation">Functional Designation</Translate>
                </Label>
                <AvInput
                  id="employee-job-status-functionalDesignation"
                  type="select"
                  className="form-control"
                  name="functionalDesignation.id"
                  value={
                    isNew ? functionalDesignations[0] && functionalDesignations[0].id : employeeJobStatusEntity.functionalDesignation?.id
                  }
                  required
                >
                  {functionalDesignations
                    ? functionalDesignations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-job-status-employee">
                  <Translate contentKey="starfirewebApp.employeeJobStatus.employee">Employee</Translate>
                </Label>
                <AvInput id="employee-job-status-employee" type="select" className="form-control" name="employee.id">
                  <option value="" key="0" />
                  {employeeBasicInfos
                    ? employeeBasicInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee-job-status" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  jobStatuses: storeState.jobStatus.entities,
  jobBases: storeState.jobBase.entities,
  employmentCategories: storeState.employmentCategory.entities,
  designations: storeState.designation.entities,
  jobLevels: storeState.jobLevel.entities,
  functionalDesignations: storeState.functionalDesignation.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeJobStatusEntity: storeState.employeeJobStatus.entity,
  loading: storeState.employeeJobStatus.loading,
  updating: storeState.employeeJobStatus.updating,
  updateSuccess: storeState.employeeJobStatus.updateSuccess,
});

const mapDispatchToProps = {
  getJobStatuses,
  getJobBases,
  getEmploymentCategories,
  getDesignations,
  getJobLevels,
  getFunctionalDesignations,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeJobStatusUpdate);
