import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITalentType } from 'app/shared/model/talent-type.model';
import { getEntities as getTalentTypes } from 'app/entities/talent-type/talent-type.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-talent.reducer';
import { IEmployeeTalent } from 'app/shared/model/employee-talent.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeTalentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeTalentUpdate = (props: IEmployeeTalentUpdateProps) => {
  const [talentTypeId, setTalentTypeId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeTalentEntity, talentTypes, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-talent');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTalentTypes();
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
        ...employeeTalentEntity,
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
          <h2 id="starfirewebApp.employeeTalent.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeTalent.home.createOrEditLabel">Create or edit a EmployeeTalent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeTalentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-talent-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-talent-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="remarksLabel" for="employee-talent-remarks">
                  <Translate contentKey="starfirewebApp.employeeTalent.remarks">Remarks</Translate>
                </Label>
                <AvField
                  id="employee-talent-remarks"
                  type="text"
                  name="remarks"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-talent-talentType">
                  <Translate contentKey="starfirewebApp.employeeTalent.talentType">Talent Type</Translate>
                </Label>
                <AvInput
                  id="employee-talent-talentType"
                  type="select"
                  className="form-control"
                  name="talentType.id"
                  value={isNew ? talentTypes[0] && talentTypes[0].id : employeeTalentEntity.talentType?.id}
                  required
                >
                  {talentTypes
                    ? talentTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.talentType}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="employee-talent-employee">
                  <Translate contentKey="starfirewebApp.employeeTalent.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-talent-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeTalentEntity.employee?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-talent" replace color="info">
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
  talentTypes: storeState.talentType.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeTalentEntity: storeState.employeeTalent.entity,
  loading: storeState.employeeTalent.loading,
  updating: storeState.employeeTalent.updating,
  updateSuccess: storeState.employeeTalent.updateSuccess,
});

const mapDispatchToProps = {
  getTalentTypes,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTalentUpdate);
