import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDesignationGroup } from 'app/shared/model/designation-group.model';
import { getEntities as getDesignationGroups } from 'app/entities/designation-group/designation-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './designation.reducer';
import { IDesignation } from 'app/shared/model/designation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDesignationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DesignationUpdate = (props: IDesignationUpdateProps) => {
  const [designationGroupId, setDesignationGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { designationEntity, designationGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/designation' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDesignationGroups();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...designationEntity,
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
          <h2 id="starfirewebApp.designation.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.designation.home.createOrEditLabel">Create or edit a Designation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : designationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="designation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="designation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="designation-name">
                  <Translate contentKey="starfirewebApp.designation.name">Name</Translate>
                </Label>
                <AvField
                  id="designation-name"
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
                <Label id="shortNameLabel" for="designation-shortName">
                  <Translate contentKey="starfirewebApp.designation.shortName">Short Name</Translate>
                </Label>
                <AvField
                  id="designation-shortName"
                  type="text"
                  name="shortName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                    pattern: { value: '[A-Za-z]+', errorMessage: translate('entity.validation.pattern', { pattern: '[A-Za-z]+' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="designation-code">
                  <Translate contentKey="starfirewebApp.designation.code">Code</Translate>
                </Label>
                <AvField
                  id="designation-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                    pattern: { value: '[A-Z]+', errorMessage: translate('entity.validation.pattern', { pattern: '[A-Z]+' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="designation-description">
                  <Translate contentKey="starfirewebApp.designation.description">Description</Translate>
                </Label>
                <AvField
                  id="designation-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="positionLabel" for="designation-position">
                  <Translate contentKey="starfirewebApp.designation.position">Position</Translate>
                </Label>
                <AvField
                  id="designation-position"
                  type="string"
                  className="form-control"
                  name="position"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="designationDateLabel" for="designation-designationDate">
                  <Translate contentKey="starfirewebApp.designation.designationDate">Designation Date</Translate>
                </Label>
                <AvField
                  id="designation-designationDate"
                  type="date"
                  className="form-control"
                  name="designationDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="statusLabel">
                  <AvInput id="designation-status" type="checkbox" className="form-check-input" name="status" />
                  <Translate contentKey="starfirewebApp.designation.status">Status</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="designation-designationGroup">
                  <Translate contentKey="starfirewebApp.designation.designationGroup">Designation Group</Translate>
                </Label>
                <AvInput
                  id="designation-designationGroup"
                  type="select"
                  className="form-control"
                  name="designationGroup.id"
                  value={isNew ? designationGroups[0] && designationGroups[0].id : designationEntity.designationGroup?.id}
                  required
                >
                  {designationGroups
                    ? designationGroups.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/designation" replace color="info">
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
  designationGroups: storeState.designationGroup.entities,
  designationEntity: storeState.designation.entity,
  loading: storeState.designation.loading,
  updating: storeState.designation.updating,
  updateSuccess: storeState.designation.updateSuccess,
});

const mapDispatchToProps = {
  getDesignationGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DesignationUpdate);
