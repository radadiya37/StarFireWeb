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
import { IWarningType } from 'app/shared/model/warning-type.model';
import { getEntities as getWarningTypes } from 'app/entities/warning-type/warning-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-warning.reducer';
import { IEmployeeWarning } from 'app/shared/model/employee-warning.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeWarningUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeWarningUpdate = (props: IEmployeeWarningUpdateProps) => {
  const [warnedEmployeeId, setWarnedEmployeeId] = useState('0');
  const [warnedById, setWarnedById] = useState('0');
  const [warningTypeId, setWarningTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeWarningEntity, employeeBasicInfos, warningTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-warning');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployeeBasicInfos();
    props.getWarningTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeWarningEntity,
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
          <h2 id="starfirewebApp.employeeWarning.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeWarning.home.createOrEditLabel">Create or edit a EmployeeWarning</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeWarningEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-warning-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-warning-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="warningLabel" for="employee-warning-warning">
                  <Translate contentKey="starfirewebApp.employeeWarning.warning">Warning</Translate>
                </Label>
                <AvField
                  id="employee-warning-warning"
                  type="text"
                  name="warning"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="actionLabel" for="employee-warning-action">
                  <Translate contentKey="starfirewebApp.employeeWarning.action">Action</Translate>
                </Label>
                <AvField
                  id="employee-warning-action"
                  type="text"
                  name="action"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="employee-warning-remarks">
                  <Translate contentKey="starfirewebApp.employeeWarning.remarks">Remarks</Translate>
                </Label>
                <AvField
                  id="employee-warning-remarks"
                  type="text"
                  name="remarks"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isActionTypeLabel">
                  <AvInput id="employee-warning-isActionType" type="checkbox" className="form-check-input" name="isActionType" />
                  <Translate contentKey="starfirewebApp.employeeWarning.isActionType">Is Action Type</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="warningDateLabel" for="employee-warning-warningDate">
                  <Translate contentKey="starfirewebApp.employeeWarning.warningDate">Warning Date</Translate>
                </Label>
                <AvField
                  id="employee-warning-warningDate"
                  type="date"
                  className="form-control"
                  name="warningDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-warning-warnedEmployee">
                  <Translate contentKey="starfirewebApp.employeeWarning.warnedEmployee">Warned Employee</Translate>
                </Label>
                <AvInput
                  id="employee-warning-warnedEmployee"
                  type="select"
                  className="form-control"
                  name="warnedEmployee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeWarningEntity.warnedEmployee?.id}
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
                <Label for="employee-warning-warnedBy">
                  <Translate contentKey="starfirewebApp.employeeWarning.warnedBy">Warned By</Translate>
                </Label>
                <AvInput
                  id="employee-warning-warnedBy"
                  type="select"
                  className="form-control"
                  name="warnedBy.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeWarningEntity.warnedBy?.id}
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
                <Label for="employee-warning-warningType">
                  <Translate contentKey="starfirewebApp.employeeWarning.warningType">Warning Type</Translate>
                </Label>
                <AvInput
                  id="employee-warning-warningType"
                  type="select"
                  className="form-control"
                  name="warningType.id"
                  value={isNew ? warningTypes[0] && warningTypes[0].id : employeeWarningEntity.warningType?.id}
                  required
                >
                  {warningTypes
                    ? warningTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.warningType}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee-warning" replace color="info">
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
  warningTypes: storeState.warningType.entities,
  employeeWarningEntity: storeState.employeeWarning.entity,
  loading: storeState.employeeWarning.loading,
  updating: storeState.employeeWarning.updating,
  updateSuccess: storeState.employeeWarning.updateSuccess,
});

const mapDispatchToProps = {
  getEmployeeBasicInfos,
  getWarningTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWarningUpdate);
