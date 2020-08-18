import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './job-level.reducer';
import { IJobLevel } from 'app/shared/model/job-level.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobLevelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobLevelUpdate = (props: IJobLevelUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { jobLevelEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/job-level' + props.location.search);
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
        ...jobLevelEntity,
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
          <h2 id="starfirewebApp.jobLevel.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.jobLevel.home.createOrEditLabel">Create or edit a JobLevel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : jobLevelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="job-level-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="job-level-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="job-level-name">
                  <Translate contentKey="starfirewebApp.jobLevel.name">Name</Translate>
                </Label>
                <AvField
                  id="job-level-name"
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
                <Label id="descriptionLabel" for="job-level-description">
                  <Translate contentKey="starfirewebApp.jobLevel.description">Description</Translate>
                </Label>
                <AvField
                  id="job-level-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="job-level-code">
                  <Translate contentKey="starfirewebApp.jobLevel.code">Code</Translate>
                </Label>
                <AvField
                  id="job-level-code"
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
                <Label id="positionLabel" for="job-level-position">
                  <Translate contentKey="starfirewebApp.jobLevel.position">Position</Translate>
                </Label>
                <AvField
                  id="job-level-position"
                  type="string"
                  className="form-control"
                  name="position"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="statusLabel">
                  <AvInput id="job-level-status" type="checkbox" className="form-check-input" name="status" />
                  <Translate contentKey="starfirewebApp.jobLevel.status">Status</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/job-level" replace color="info">
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
  jobLevelEntity: storeState.jobLevel.entity,
  loading: storeState.jobLevel.loading,
  updating: storeState.jobLevel.updating,
  updateSuccess: storeState.jobLevel.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobLevelUpdate);
