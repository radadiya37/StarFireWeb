import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './talent-type.reducer';
import { ITalentType } from 'app/shared/model/talent-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITalentTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TalentTypeUpdate = (props: ITalentTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { talentTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/talent-type' + props.location.search);
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
        ...talentTypeEntity,
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
          <h2 id="starfirewebApp.talentType.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.talentType.home.createOrEditLabel">Create or edit a TalentType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : talentTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="talent-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="talent-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="talentTypeLabel" for="talent-type-talentType">
                  <Translate contentKey="starfirewebApp.talentType.talentType">Talent Type</Translate>
                </Label>
                <AvField
                  id="talent-type-talentType"
                  type="text"
                  name="talentType"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="talent-type-description">
                  <Translate contentKey="starfirewebApp.talentType.description">Description</Translate>
                </Label>
                <AvField
                  id="talent-type-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/talent-type" replace color="info">
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
  talentTypeEntity: storeState.talentType.entity,
  loading: storeState.talentType.loading,
  updating: storeState.talentType.updating,
  updateSuccess: storeState.talentType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TalentTypeUpdate);
