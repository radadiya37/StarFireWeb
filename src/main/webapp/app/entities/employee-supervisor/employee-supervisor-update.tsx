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
import { getEntity, updateEntity, createEntity, reset } from './employee-supervisor.reducer';
import { IEmployeeSupervisor } from 'app/shared/model/employee-supervisor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeSupervisorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeSupervisorUpdate = (props: IEmployeeSupervisorUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [supervisorId, setSupervisorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeSupervisorEntity, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-supervisor');
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
        ...employeeSupervisorEntity,
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
          <h2 id="starfirewebApp.employeeSupervisor.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeSupervisor.home.createOrEditLabel">Create or edit a EmployeeSupervisor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeSupervisorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-supervisor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-supervisor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="isDirectSupervisorLabel">
                  <AvInput
                    id="employee-supervisor-isDirectSupervisor"
                    type="checkbox"
                    className="form-check-input"
                    name="isDirectSupervisor"
                  />
                  <Translate contentKey="starfirewebApp.employeeSupervisor.isDirectSupervisor">Is Direct Supervisor</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="effectiveDateLabel" for="employee-supervisor-effectiveDate">
                  <Translate contentKey="starfirewebApp.employeeSupervisor.effectiveDate">Effective Date</Translate>
                </Label>
                <AvField
                  id="employee-supervisor-effectiveDate"
                  type="date"
                  className="form-control"
                  name="effectiveDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-supervisor-employee">
                  <Translate contentKey="starfirewebApp.employeeSupervisor.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-supervisor-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeSupervisorEntity.employee?.id}
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
              <AvGroup>
                <Label for="employee-supervisor-supervisor">
                  <Translate contentKey="starfirewebApp.employeeSupervisor.supervisor">Supervisor</Translate>
                </Label>
                <AvInput
                  id="employee-supervisor-supervisor"
                  type="select"
                  className="form-control"
                  name="supervisor.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeSupervisorEntity.supervisor?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-supervisor" replace color="info">
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
  employeeSupervisorEntity: storeState.employeeSupervisor.entity,
  loading: storeState.employeeSupervisor.loading,
  updating: storeState.employeeSupervisor.updating,
  updateSuccess: storeState.employeeSupervisor.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSupervisorUpdate);
