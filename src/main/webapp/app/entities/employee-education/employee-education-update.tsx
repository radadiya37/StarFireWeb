import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEducation } from 'app/shared/model/education.model';
import { getEntities as getEducations } from 'app/entities/education/education.reducer';
import { IGrade } from 'app/shared/model/grade.model';
import { getEntities as getGrades } from 'app/entities/grade/grade.reducer';
import { IEducationInstitute } from 'app/shared/model/education-institute.model';
import { getEntities as getEducationInstitutes } from 'app/entities/education-institute/education-institute.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-education.reducer';
import { IEmployeeEducation } from 'app/shared/model/employee-education.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeEducationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeEducationUpdate = (props: IEmployeeEducationUpdateProps) => {
  const [educationId, setEducationId] = useState('0');
  const [gradeId, setGradeId] = useState('0');
  const [instituteId, setInstituteId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeEducationEntity, educations, grades, educationInstitutes, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-education');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEducations();
    props.getGrades();
    props.getEducationInstitutes();
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
        ...employeeEducationEntity,
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
          <h2 id="starfirewebApp.employeeEducation.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeEducation.home.createOrEditLabel">Create or edit a EmployeeEducation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeEducationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-education-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-education-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="passedYearLabel" for="employee-education-passedYear">
                  <Translate contentKey="starfirewebApp.employeeEducation.passedYear">Passed Year</Translate>
                </Label>
                <AvField
                  id="employee-education-passedYear"
                  type="string"
                  className="form-control"
                  name="passedYear"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cgpaLabel" for="employee-education-cgpa">
                  <Translate contentKey="starfirewebApp.employeeEducation.cgpa">Cgpa</Translate>
                </Label>
                <AvField
                  id="employee-education-cgpa"
                  type="string"
                  className="form-control"
                  name="cgpa"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="scaleLabel" for="employee-education-scale">
                  <Translate contentKey="starfirewebApp.employeeEducation.scale">Scale</Translate>
                </Label>
                <AvField
                  id="employee-education-scale"
                  type="string"
                  className="form-control"
                  name="scale"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="hasForeignDegreeLabel">
                  <AvInput id="employee-education-hasForeignDegree" type="checkbox" className="form-check-input" name="hasForeignDegree" />
                  <Translate contentKey="starfirewebApp.employeeEducation.hasForeignDegree">Has Foreign Degree</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isProfessionalLabel">
                  <AvInput id="employee-education-isProfessional" type="checkbox" className="form-check-input" name="isProfessional" />
                  <Translate contentKey="starfirewebApp.employeeEducation.isProfessional">Is Professional</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isLastEducationLabel">
                  <AvInput id="employee-education-isLastEducation" type="checkbox" className="form-check-input" name="isLastEducation" />
                  <Translate contentKey="starfirewebApp.employeeEducation.isLastEducation">Is Last Education</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="employee-education-education">
                  <Translate contentKey="starfirewebApp.employeeEducation.education">Education</Translate>
                </Label>
                <AvInput id="employee-education-education" type="select" className="form-control" name="education.id">
                  <option value="" key="0" />
                  {educations
                    ? educations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-education-grade">
                  <Translate contentKey="starfirewebApp.employeeEducation.grade">Grade</Translate>
                </Label>
                <AvInput id="employee-education-grade" type="select" className="form-control" name="grade.id">
                  <option value="" key="0" />
                  {grades
                    ? grades.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-education-institute">
                  <Translate contentKey="starfirewebApp.employeeEducation.institute">Institute</Translate>
                </Label>
                <AvInput id="employee-education-institute" type="select" className="form-control" name="institute.id">
                  <option value="" key="0" />
                  {educationInstitutes
                    ? educationInstitutes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-education-employee">
                  <Translate contentKey="starfirewebApp.employeeEducation.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-education-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeEducationEntity.employee?.id}
                  required
                >
                  {employeeBasicInfos
                    ? employeeBasicInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee-education" replace color="info">
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
  educations: storeState.education.entities,
  grades: storeState.grade.entities,
  educationInstitutes: storeState.educationInstitute.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeEducationEntity: storeState.employeeEducation.entity,
  loading: storeState.employeeEducation.loading,
  updating: storeState.employeeEducation.updating,
  updateSuccess: storeState.employeeEducation.updateSuccess,
});

const mapDispatchToProps = {
  getEducations,
  getGrades,
  getEducationInstitutes,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEducationUpdate);
