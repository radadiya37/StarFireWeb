import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IReligion } from 'app/shared/model/religion.model';
import { getEntities as getReligions } from 'app/entities/religion/religion.reducer';
import { IMaritalStatus } from 'app/shared/model/marital-status.model';
import { getEntities as getMaritalStatuses } from 'app/entities/marital-status/marital-status.reducer';
import { IBloodGroup } from 'app/shared/model/blood-group.model';
import { getEntities as getBloodGroups } from 'app/entities/blood-group/blood-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-basic-info.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeBasicInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeBasicInfoUpdate = (props: IEmployeeBasicInfoUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [religionId, setReligionId] = useState('0');
  const [maritalStatusId, setMaritalStatusId] = useState('0');
  const [bloodGroupId, setBloodGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeBasicInfoEntity, users, religions, maritalStatuses, bloodGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-basic-info');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getReligions();
    props.getMaritalStatuses();
    props.getBloodGroups();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeBasicInfoEntity,
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
          <h2 id="starfirewebApp.employeeBasicInfo.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeBasicInfo.home.createOrEditLabel">Create or edit a EmployeeBasicInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeBasicInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-basic-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-basic-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="employee-basic-info-code">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.code">Code</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-code"
                  type="text"
                  name="code"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dobLabel" for="employee-basic-info-dob">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.dob">Dob</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-dob"
                  type="date"
                  className="form-control"
                  name="dob"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="personalEmailLabel" for="employee-basic-info-personalEmail">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.personalEmail">Personal Email</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-personalEmail"
                  type="text"
                  name="personalEmail"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="employee-basic-info-phone">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.phone">Phone</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-phone"
                  type="text"
                  name="phone"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="employee-basic-info-telephone">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.telephone">Telephone</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-telephone"
                  type="text"
                  name="telephone"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nationalityLabel" for="employee-basic-info-nationality">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.nationality">Nationality</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-nationality"
                  type="text"
                  name="nationality"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoPathLabel" for="employee-basic-info-photoPath">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.photoPath">Photo Path</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-photoPath"
                  type="text"
                  name="photoPath"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="statusLabel">
                  <AvInput id="employee-basic-info-status" type="checkbox" className="form-check-input" name="status" />
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.status">Status</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="employee-basic-info-gender">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="employee-basic-info-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && employeeBasicInfoEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('starfirewebApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('starfirewebApp.Gender.FEMALE')}</option>
                  <option value="OTHER">{translate('starfirewebApp.Gender.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="joinDateLabel" for="employee-basic-info-joinDate">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.joinDate">Join Date</Translate>
                </Label>
                <AvField
                  id="employee-basic-info-joinDate"
                  type="date"
                  className="form-control"
                  name="joinDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="reviewMonthLabel" for="employee-basic-info-reviewMonth">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.reviewMonth">Review Month</Translate>
                </Label>
                <AvInput
                  id="employee-basic-info-reviewMonth"
                  type="select"
                  className="form-control"
                  name="reviewMonth"
                  value={(!isNew && employeeBasicInfoEntity.reviewMonth) || 'JANUARY'}
                >
                  <option value="JANUARY">{translate('starfirewebApp.Month.JANUARY')}</option>
                  <option value="FEBRUARY">{translate('starfirewebApp.Month.FEBRUARY')}</option>
                  <option value="MARCH">{translate('starfirewebApp.Month.MARCH')}</option>
                  <option value="APRIL">{translate('starfirewebApp.Month.APRIL')}</option>
                  <option value="MAY">{translate('starfirewebApp.Month.MAY')}</option>
                  <option value="JUNE">{translate('starfirewebApp.Month.JUNE')}</option>
                  <option value="JULY">{translate('starfirewebApp.Month.JULY')}</option>
                  <option value="AUGUST">{translate('starfirewebApp.Month.AUGUST')}</option>
                  <option value="SEPTEMBER">{translate('starfirewebApp.Month.SEPTEMBER')}</option>
                  <option value="OCTOBER">{translate('starfirewebApp.Month.OCTOBER')}</option>
                  <option value="NOVEMBER">{translate('starfirewebApp.Month.NOVEMBER')}</option>
                  <option value="DECEMBER">{translate('starfirewebApp.Month.DECEMBER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-basic-info-user">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.user">User</Translate>
                </Label>
                <AvInput id="employee-basic-info-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-basic-info-religion">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.religion">Religion</Translate>
                </Label>
                <AvInput
                  id="employee-basic-info-religion"
                  type="select"
                  className="form-control"
                  name="religion.id"
                  value={isNew ? religions[0] && religions[0].id : employeeBasicInfoEntity.religion?.id}
                  required
                >
                  {religions
                    ? religions.map(otherEntity => (
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
                <Label for="employee-basic-info-maritalStatus">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.maritalStatus">Marital Status</Translate>
                </Label>
                <AvInput id="employee-basic-info-maritalStatus" type="select" className="form-control" name="maritalStatus.id">
                  <option value="" key="0" />
                  {maritalStatuses
                    ? maritalStatuses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-basic-info-bloodGroup">
                  <Translate contentKey="starfirewebApp.employeeBasicInfo.bloodGroup">Blood Group</Translate>
                </Label>
                <AvInput
                  id="employee-basic-info-bloodGroup"
                  type="select"
                  className="form-control"
                  name="bloodGroup.id"
                  value={isNew ? bloodGroups[0] && bloodGroups[0].id : employeeBasicInfoEntity.bloodGroup?.id}
                  required
                >
                  {bloodGroups
                    ? bloodGroups.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/employee-basic-info" replace color="info">
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
  users: storeState.userManagement.users,
  religions: storeState.religion.entities,
  maritalStatuses: storeState.maritalStatus.entities,
  bloodGroups: storeState.bloodGroup.entities,
  employeeBasicInfoEntity: storeState.employeeBasicInfo.entity,
  loading: storeState.employeeBasicInfo.loading,
  updating: storeState.employeeBasicInfo.updating,
  updateSuccess: storeState.employeeBasicInfo.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getReligions,
  getMaritalStatuses,
  getBloodGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBasicInfoUpdate);
