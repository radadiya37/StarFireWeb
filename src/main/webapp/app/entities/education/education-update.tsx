import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEducationGroup } from 'app/shared/model/education-group.model';
import { getEntities as getEducationGroups } from 'app/entities/education-group/education-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './education.reducer';
import { IEducation } from 'app/shared/model/education.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEducationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EducationUpdate = (props: IEducationUpdateProps) => {
  const [educationGroupId, setEducationGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { educationEntity, educationGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/education' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEducationGroups();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...educationEntity,
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
          <h2 id="starfirewebApp.education.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.education.home.createOrEditLabel">Create or edit a Education</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : educationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="education-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="education-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="education-name">
                  <Translate contentKey="starfirewebApp.education.name">Name</Translate>
                </Label>
                <AvField
                  id="education-name"
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
                <Label id="descriptionLabel" for="education-description">
                  <Translate contentKey="starfirewebApp.education.description">Description</Translate>
                </Label>
                <AvField
                  id="education-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="statusLabel">
                  <AvInput id="education-status" type="checkbox" className="form-check-input" name="status" />
                  <Translate contentKey="starfirewebApp.education.status">Status</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="education-educationGroup">
                  <Translate contentKey="starfirewebApp.education.educationGroup">Education Group</Translate>
                </Label>
                <AvInput id="education-educationGroup" type="select" className="form-control" name="educationGroup.id">
                  <option value="" key="0" />
                  {educationGroups
                    ? educationGroups.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/education" replace color="info">
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
  educationGroups: storeState.educationGroup.entities,
  educationEntity: storeState.education.entity,
  loading: storeState.education.loading,
  updating: storeState.education.updating,
  updateSuccess: storeState.education.updateSuccess,
});

const mapDispatchToProps = {
  getEducationGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EducationUpdate);
