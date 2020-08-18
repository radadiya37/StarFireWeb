import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPersonalRelationship } from 'app/shared/model/personal-relationship.model';
import { getEntities as getPersonalRelationships } from 'app/entities/personal-relationship/personal-relationship.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-family.reducer';
import { IEmployeeFamily } from 'app/shared/model/employee-family.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeFamilyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeFamilyUpdate = (props: IEmployeeFamilyUpdateProps) => {
  const [employeeRelationshipId, setEmployeeRelationshipId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeFamilyEntity, personalRelationships, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-family');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPersonalRelationships();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeFamilyEntity,
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
          <h2 id="starfirewebApp.employeeFamily.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeFamily.home.createOrEditLabel">Create or edit a EmployeeFamily</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeFamilyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-family-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-family-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="employee-family-name">
                  <Translate contentKey="starfirewebApp.employeeFamily.name">Name</Translate>
                </Label>
                <AvField
                  id="employee-family-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                    pattern: { value: '[A-Za-z]+', errorMessage: translate('entity.validation.pattern', { pattern: '[A-Za-z]+' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dobLabel" for="employee-family-dob">
                  <Translate contentKey="starfirewebApp.employeeFamily.dob">Dob</Translate>
                </Label>
                <AvField id="employee-family-dob" type="date" className="form-control" name="dob" />
              </AvGroup>
              <AvGroup>
                <Label id="nidLabel" for="employee-family-nid">
                  <Translate contentKey="starfirewebApp.employeeFamily.nid">Nid</Translate>
                </Label>
                <AvField
                  id="employee-family-nid"
                  type="text"
                  name="nid"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="employee-family-phone">
                  <Translate contentKey="starfirewebApp.employeeFamily.phone">Phone</Translate>
                </Label>
                <AvField
                  id="employee-family-phone"
                  type="text"
                  name="phone"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="professionLabel" for="employee-family-profession">
                  <Translate contentKey="starfirewebApp.employeeFamily.profession">Profession</Translate>
                </Label>
                <AvField
                  id="employee-family-profession"
                  type="text"
                  name="profession"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="employee-family-gender">
                  <Translate contentKey="starfirewebApp.employeeFamily.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="employee-family-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && employeeFamilyEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('starfirewebApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('starfirewebApp.Gender.FEMALE')}</option>
                  <option value="OTHER">{translate('starfirewebApp.Gender.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-family-employeeRelationship">
                  <Translate contentKey="starfirewebApp.employeeFamily.employeeRelationship">Employee Relationship</Translate>
                </Label>
                <AvInput
                  id="employee-family-employeeRelationship"
                  type="select"
                  className="form-control"
                  name="employeeRelationship.id"
                  value={isNew ? personalRelationships[0] && personalRelationships[0].id : employeeFamilyEntity.employeeRelationship?.id}
                  required
                >
                  {personalRelationships
                    ? personalRelationships.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/employee-family" replace color="info">
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
  personalRelationships: storeState.personalRelationship.entities,
  employeeFamilyEntity: storeState.employeeFamily.entity,
  loading: storeState.employeeFamily.loading,
  updating: storeState.employeeFamily.updating,
  updateSuccess: storeState.employeeFamily.updateSuccess,
});

const mapDispatchToProps = {
  getPersonalRelationships,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFamilyUpdate);
