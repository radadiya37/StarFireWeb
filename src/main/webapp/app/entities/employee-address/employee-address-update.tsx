import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-address.reducer';
import { IEmployeeAddress } from 'app/shared/model/employee-address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeAddressUpdate = (props: IEmployeeAddressUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [presentAddressId, setPresentAddressId] = useState('0');
  const [permanentAddressId, setPermanentAddressId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeAddressEntity, employeeBasicInfos, addresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-address');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployeeBasicInfos();
    props.getAddresses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeAddressEntity,
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
          <h2 id="starfirewebApp.employeeAddress.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeAddress.home.createOrEditLabel">Create or edit a EmployeeAddress</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeAddressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="employee-address-employee">
                  <Translate contentKey="starfirewebApp.employeeAddress.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-address-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeAddressEntity.employee?.id}
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
                <Label for="employee-address-presentAddress">
                  <Translate contentKey="starfirewebApp.employeeAddress.presentAddress">Present Address</Translate>
                </Label>
                <AvInput id="employee-address-presentAddress" type="select" className="form-control" name="presentAddress.id">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.address}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-address-permanentAddress">
                  <Translate contentKey="starfirewebApp.employeeAddress.permanentAddress">Permanent Address</Translate>
                </Label>
                <AvInput id="employee-address-permanentAddress" type="select" className="form-control" name="permanentAddress.id">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.address}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee-address" replace color="info">
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
  addresses: storeState.address.entities,
  employeeAddressEntity: storeState.employeeAddress.entity,
  loading: storeState.employeeAddress.loading,
  updating: storeState.employeeAddress.updating,
  updateSuccess: storeState.employeeAddress.updateSuccess,
});

const mapDispatchToProps = {
  getEmployeeBasicInfos,
  getAddresses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddressUpdate);
