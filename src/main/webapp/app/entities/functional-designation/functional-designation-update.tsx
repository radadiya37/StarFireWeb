import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './functional-designation.reducer';
import { IFunctionalDesignation } from 'app/shared/model/functional-designation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFunctionalDesignationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FunctionalDesignationUpdate = (props: IFunctionalDesignationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { functionalDesignationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/functional-designation' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...functionalDesignationEntity,
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
          <h2 id="starfirewebApp.functionalDesignation.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.functionalDesignation.home.createOrEditLabel">
              Create or edit a FunctionalDesignation
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : functionalDesignationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="functional-designation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="functional-designation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="functional-designation-name">
                  <Translate contentKey="starfirewebApp.functionalDesignation.name">Name</Translate>
                </Label>
                <AvField
                  id="functional-designation-name"
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
                <Label id="codeLabel" for="functional-designation-code">
                  <Translate contentKey="starfirewebApp.functionalDesignation.code">Code</Translate>
                </Label>
                <AvField
                  id="functional-designation-code"
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
                <Label id="positionLabel" for="functional-designation-position">
                  <Translate contentKey="starfirewebApp.functionalDesignation.position">Position</Translate>
                </Label>
                <AvField
                  id="functional-designation-position"
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
                <Label id="shortNameLabel" for="functional-designation-shortName">
                  <Translate contentKey="starfirewebApp.functionalDesignation.shortName">Short Name</Translate>
                </Label>
                <AvField
                  id="functional-designation-shortName"
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
                <Label id="descriptionLabel" for="functional-designation-description">
                  <Translate contentKey="starfirewebApp.functionalDesignation.description">Description</Translate>
                </Label>
                <AvField
                  id="functional-designation-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="designationDateLabel" for="functional-designation-designationDate">
                  <Translate contentKey="starfirewebApp.functionalDesignation.designationDate">Designation Date</Translate>
                </Label>
                <AvField
                  id="functional-designation-designationDate"
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
                  <AvInput id="functional-designation-status" type="checkbox" className="form-check-input" name="status" />
                  <Translate contentKey="starfirewebApp.functionalDesignation.status">Status</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/functional-designation" replace color="info">
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
  functionalDesignationEntity: storeState.functionalDesignation.entity,
  loading: storeState.functionalDesignation.loading,
  updating: storeState.functionalDesignation.updating,
  updateSuccess: storeState.functionalDesignation.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalDesignationUpdate);
