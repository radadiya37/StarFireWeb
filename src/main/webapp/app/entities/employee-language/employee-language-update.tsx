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
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { ILanguageProficiency } from 'app/shared/model/language-proficiency.model';
import { getEntities as getLanguageProficiencies } from 'app/entities/language-proficiency/language-proficiency.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-language.reducer';
import { IEmployeeLanguage } from 'app/shared/model/employee-language.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeLanguageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeLanguageUpdate = (props: IEmployeeLanguageUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [languageId, setLanguageId] = useState('0');
  const [languageProficiencyId, setLanguageProficiencyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeLanguageEntity, employeeBasicInfos, languages, languageProficiencies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-language');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployeeBasicInfos();
    props.getLanguages();
    props.getLanguageProficiencies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeeLanguageEntity,
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
          <h2 id="starfirewebApp.employeeLanguage.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeLanguage.home.createOrEditLabel">Create or edit a EmployeeLanguage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeLanguageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-language-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-language-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="employee-language-employee">
                  <Translate contentKey="starfirewebApp.employeeLanguage.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-language-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeLanguageEntity.employee?.id}
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
                <Label for="employee-language-language">
                  <Translate contentKey="starfirewebApp.employeeLanguage.language">Language</Translate>
                </Label>
                <AvInput
                  id="employee-language-language"
                  type="select"
                  className="form-control"
                  name="language.id"
                  value={isNew ? languages[0] && languages[0].id : employeeLanguageEntity.language?.id}
                  required
                >
                  {languages
                    ? languages.map(otherEntity => (
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
                <Label for="employee-language-languageProficiency">
                  <Translate contentKey="starfirewebApp.employeeLanguage.languageProficiency">Language Proficiency</Translate>
                </Label>
                <AvInput
                  id="employee-language-languageProficiency"
                  type="select"
                  className="form-control"
                  name="languageProficiency.id"
                  value={isNew ? languageProficiencies[0] && languageProficiencies[0].id : employeeLanguageEntity.languageProficiency?.id}
                  required
                >
                  {languageProficiencies
                    ? languageProficiencies.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/employee-language" replace color="info">
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
  languages: storeState.language.entities,
  languageProficiencies: storeState.languageProficiency.entities,
  employeeLanguageEntity: storeState.employeeLanguage.entity,
  loading: storeState.employeeLanguage.loading,
  updating: storeState.employeeLanguage.updating,
  updateSuccess: storeState.employeeLanguage.updateSuccess,
});

const mapDispatchToProps = {
  getEmployeeBasicInfos,
  getLanguages,
  getLanguageProficiencies,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLanguageUpdate);
