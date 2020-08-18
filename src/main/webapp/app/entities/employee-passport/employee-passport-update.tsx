import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-passport.reducer';
import { IEmployeePassport } from 'app/shared/model/employee-passport.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeePassportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeePassportUpdate = (props: IEmployeePassportUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeePassportEntity, countries, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-passport');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
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
        ...employeePassportEntity,
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
          <h2 id="starfirewebApp.employeePassport.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeePassport.home.createOrEditLabel">Create or edit a EmployeePassport</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeePassportEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-passport-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-passport-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="passportTypeLabel" for="employee-passport-passportType">
                  <Translate contentKey="starfirewebApp.employeePassport.passportType">Passport Type</Translate>
                </Label>
                <AvField
                  id="employee-passport-passportType"
                  type="text"
                  name="passportType"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="passportNoLabel" for="employee-passport-passportNo">
                  <Translate contentKey="starfirewebApp.employeePassport.passportNo">Passport No</Translate>
                </Label>
                <AvField
                  id="employee-passport-passportNo"
                  type="text"
                  name="passportNo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="employee-passport-issueDate">
                  <Translate contentKey="starfirewebApp.employeePassport.issueDate">Issue Date</Translate>
                </Label>
                <AvField
                  id="employee-passport-issueDate"
                  type="date"
                  className="form-control"
                  name="issueDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expireDateLabel" for="employee-passport-expireDate">
                  <Translate contentKey="starfirewebApp.employeePassport.expireDate">Expire Date</Translate>
                </Label>
                <AvField
                  id="employee-passport-expireDate"
                  type="date"
                  className="form-control"
                  name="expireDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-passport-country">
                  <Translate contentKey="starfirewebApp.employeePassport.country">Country</Translate>
                </Label>
                <AvInput
                  id="employee-passport-country"
                  type="select"
                  className="form-control"
                  name="country.id"
                  value={isNew ? countries[0] && countries[0].id : employeePassportEntity.country?.id}
                  required
                >
                  {countries
                    ? countries.map(otherEntity => (
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
                <Label for="employee-passport-employee">
                  <Translate contentKey="starfirewebApp.employeePassport.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-passport-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeePassportEntity.employee?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-passport" replace color="info">
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
  countries: storeState.country.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeePassportEntity: storeState.employeePassport.entity,
  loading: storeState.employeePassport.loading,
  updating: storeState.employeePassport.updating,
  updateSuccess: storeState.employeePassport.updateSuccess,
});

const mapDispatchToProps = {
  getCountries,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePassportUpdate);
