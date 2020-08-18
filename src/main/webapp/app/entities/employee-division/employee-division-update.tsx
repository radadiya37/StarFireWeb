import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDivision } from 'app/shared/model/division.model';
import { getEntities as getDivisions } from 'app/entities/division/division.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IBranch } from 'app/shared/model/branch.model';
import { getEntities as getBranches } from 'app/entities/branch/branch.reducer';
import { IUnit } from 'app/shared/model/unit.model';
import { getEntities as getUnits } from 'app/entities/unit/unit.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-division.reducer';
import { IEmployeeDivision } from 'app/shared/model/employee-division.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeDivisionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDivisionUpdate = (props: IEmployeeDivisionUpdateProps) => {
  const [divisionId, setDivisionId] = useState('0');
  const [departmentId, setDepartmentId] = useState('0');
  const [branchId, setBranchId] = useState('0');
  const [unitId, setUnitId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeDivisionEntity, divisions, departments, branches, units, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-division');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDivisions();
    props.getDepartments();
    props.getBranches();
    props.getUnits();
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
        ...employeeDivisionEntity,
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
          <h2 id="starfirewebApp.employeeDivision.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeDivision.home.createOrEditLabel">Create or edit a EmployeeDivision</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeDivisionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-division-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-division-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="effectiveDateLabel" for="employee-division-effectiveDate">
                  <Translate contentKey="starfirewebApp.employeeDivision.effectiveDate">Effective Date</Translate>
                </Label>
                <AvField
                  id="employee-division-effectiveDate"
                  type="date"
                  className="form-control"
                  name="effectiveDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-division-division">
                  <Translate contentKey="starfirewebApp.employeeDivision.division">Division</Translate>
                </Label>
                <AvInput
                  id="employee-division-division"
                  type="select"
                  className="form-control"
                  name="division.id"
                  value={isNew ? divisions[0] && divisions[0].id : employeeDivisionEntity.division?.id}
                  required
                >
                  {divisions
                    ? divisions.map(otherEntity => (
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
                <Label for="employee-division-department">
                  <Translate contentKey="starfirewebApp.employeeDivision.department">Department</Translate>
                </Label>
                <AvInput
                  id="employee-division-department"
                  type="select"
                  className="form-control"
                  name="department.id"
                  value={isNew ? departments[0] && departments[0].id : employeeDivisionEntity.department?.id}
                  required
                >
                  {departments
                    ? departments.map(otherEntity => (
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
                <Label for="employee-division-branch">
                  <Translate contentKey="starfirewebApp.employeeDivision.branch">Branch</Translate>
                </Label>
                <AvInput
                  id="employee-division-branch"
                  type="select"
                  className="form-control"
                  name="branch.id"
                  value={isNew ? branches[0] && branches[0].id : employeeDivisionEntity.branch?.id}
                  required
                >
                  {branches
                    ? branches.map(otherEntity => (
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
                <Label for="employee-division-unit">
                  <Translate contentKey="starfirewebApp.employeeDivision.unit">Unit</Translate>
                </Label>
                <AvInput
                  id="employee-division-unit"
                  type="select"
                  className="form-control"
                  name="unit.id"
                  value={isNew ? units[0] && units[0].id : employeeDivisionEntity.unit?.id}
                  required
                >
                  {units
                    ? units.map(otherEntity => (
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
                <Label for="employee-division-employee">
                  <Translate contentKey="starfirewebApp.employeeDivision.employee">Employee</Translate>
                </Label>
                <AvInput id="employee-division-employee" type="select" className="form-control" name="employee.id">
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
              <Button tag={Link} id="cancel-save" to="/employee-division" replace color="info">
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
  divisions: storeState.division.entities,
  departments: storeState.department.entities,
  branches: storeState.branch.entities,
  units: storeState.unit.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeDivisionEntity: storeState.employeeDivision.entity,
  loading: storeState.employeeDivision.loading,
  updating: storeState.employeeDivision.updating,
  updateSuccess: storeState.employeeDivision.updateSuccess,
});

const mapDispatchToProps = {
  getDivisions,
  getDepartments,
  getBranches,
  getUnits,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDivisionUpdate);
