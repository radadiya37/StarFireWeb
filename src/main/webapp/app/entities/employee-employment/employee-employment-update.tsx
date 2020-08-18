import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-employment.reducer';
import { IEmployeeEmployment } from 'app/shared/model/employee-employment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeEmploymentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeEmploymentUpdate = (props: IEmployeeEmploymentUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeEmploymentEntity, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-employment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...employeeEmploymentEntity,
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
          <h2 id="starfirewebApp.employeeEmployment.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeEmployment.home.createOrEditLabel">Create or edit a EmployeeEmployment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeEmploymentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-employment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-employment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyNameLabel" for="employee-employment-companyName">
                  <Translate contentKey="starfirewebApp.employeeEmployment.companyName">Company Name</Translate>
                </Label>
                <AvField
                  id="employee-employment-companyName"
                  type="text"
                  name="companyName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="employee-employment-address">
                  <Translate contentKey="starfirewebApp.employeeEmployment.address">Address</Translate>
                </Label>
                <AvField
                  id="employee-employment-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="jobTitleLabel" for="employee-employment-jobTitle">
                  <Translate contentKey="starfirewebApp.employeeEmployment.jobTitle">Job Title</Translate>
                </Label>
                <AvField
                  id="employee-employment-jobTitle"
                  type="text"
                  name="jobTitle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="employee-employment-startDate">
                  <Translate contentKey="starfirewebApp.employeeEmployment.startDate">Start Date</Translate>
                </Label>
                <AvField
                  id="employee-employment-startDate"
                  type="date"
                  className="form-control"
                  name="startDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="employee-employment-endDate">
                  <Translate contentKey="starfirewebApp.employeeEmployment.endDate">End Date</Translate>
                </Label>
                <AvField
                  id="employee-employment-endDate"
                  type="date"
                  className="form-control"
                  name="endDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastSalaryLabel" for="employee-employment-lastSalary">
                  <Translate contentKey="starfirewebApp.employeeEmployment.lastSalary">Last Salary</Translate>
                </Label>
                <AvField id="employee-employment-lastSalary" type="string" className="form-control" name="lastSalary" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="employee-employment-remarks">
                  <Translate contentKey="starfirewebApp.employeeEmployment.remarks">Remarks</Translate>
                </Label>
                <AvField
                  id="employee-employment-remarks"
                  type="text"
                  name="remarks"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-employment-employee">
                  <Translate contentKey="starfirewebApp.employeeEmployment.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-employment-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeEmploymentEntity.employee?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-employment" replace color="info">
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
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeEmploymentEntity: storeState.employeeEmployment.entity,
  loading: storeState.employeeEmployment.loading,
  updating: storeState.employeeEmployment.updating,
  updateSuccess: storeState.employeeEmployment.updateSuccess,
});

const mapDispatchToProps = {
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEmploymentUpdate);
