import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAwardType } from 'app/shared/model/award-type.model';
import { getEntities as getAwardTypes } from 'app/entities/award-type/award-type.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-award.reducer';
import { IEmployeeAward } from 'app/shared/model/employee-award.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeAwardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeAwardUpdate = (props: IEmployeeAwardUpdateProps) => {
  const [awardTypeId, setAwardTypeId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeAwardEntity, awardTypes, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-award' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAwardTypes();
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
        ...employeeAwardEntity,
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
          <h2 id="starfirewebApp.employeeAward.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeAward.home.createOrEditLabel">Create or edit a EmployeeAward</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeAwardEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-award-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-award-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="awardDateLabel" for="employee-award-awardDate">
                  <Translate contentKey="starfirewebApp.employeeAward.awardDate">Award Date</Translate>
                </Label>
                <AvField
                  id="employee-award-awardDate"
                  type="date"
                  className="form-control"
                  name="awardDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="awardNameLabel" for="employee-award-awardName">
                  <Translate contentKey="starfirewebApp.employeeAward.awardName">Award Name</Translate>
                </Label>
                <AvField
                  id="employee-award-awardName"
                  type="text"
                  name="awardName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="giftLabel" for="employee-award-gift">
                  <Translate contentKey="starfirewebApp.employeeAward.gift">Gift</Translate>
                </Label>
                <AvField
                  id="employee-award-gift"
                  type="text"
                  name="gift"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prizeAmountLabel" for="employee-award-prizeAmount">
                  <Translate contentKey="starfirewebApp.employeeAward.prizeAmount">Prize Amount</Translate>
                </Label>
                <AvField id="employee-award-prizeAmount" type="string" className="form-control" name="prizeAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="awardCertificatePathLabel" for="employee-award-awardCertificatePath">
                  <Translate contentKey="starfirewebApp.employeeAward.awardCertificatePath">Award Certificate Path</Translate>
                </Label>
                <AvField
                  id="employee-award-awardCertificatePath"
                  type="text"
                  name="awardCertificatePath"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="employee-award-remarks">
                  <Translate contentKey="starfirewebApp.employeeAward.remarks">Remarks</Translate>
                </Label>
                <AvField
                  id="employee-award-remarks"
                  type="text"
                  name="remarks"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-award-awardType">
                  <Translate contentKey="starfirewebApp.employeeAward.awardType">Award Type</Translate>
                </Label>
                <AvInput id="employee-award-awardType" type="select" className="form-control" name="awardType.id">
                  <option value="" key="0" />
                  {awardTypes
                    ? awardTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.awardType}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-award-employee">
                  <Translate contentKey="starfirewebApp.employeeAward.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-award-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeAwardEntity.employee?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-award" replace color="info">
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
  awardTypes: storeState.awardType.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeAwardEntity: storeState.employeeAward.entity,
  loading: storeState.employeeAward.loading,
  updating: storeState.employeeAward.updating,
  updateSuccess: storeState.employeeAward.updateSuccess,
});

const mapDispatchToProps = {
  getAwardTypes,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAwardUpdate);
