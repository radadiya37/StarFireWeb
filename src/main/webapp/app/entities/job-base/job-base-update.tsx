import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './job-base.reducer';
import { IJobBase } from 'app/shared/model/job-base.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobBaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobBaseUpdate = (props: IJobBaseUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { jobBaseEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/job-base' + props.location.search);
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
        ...jobBaseEntity,
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
          <h2 id="starfirewebApp.jobBase.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.jobBase.home.createOrEditLabel">Create or edit a JobBase</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : jobBaseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="job-base-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="job-base-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="job-base-name">
                  <Translate contentKey="starfirewebApp.jobBase.name">Name</Translate>
                </Label>
                <AvField
                  id="job-base-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="job-base-code">
                  <Translate contentKey="starfirewebApp.jobBase.code">Code</Translate>
                </Label>
                <AvField
                  id="job-base-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 1, errorMessage: translate('entity.validation.maxlength', { max: 1 }) },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isSystemReservedLabel">
                  <AvInput id="job-base-isSystemReserved" type="checkbox" className="form-check-input" name="isSystemReserved" />
                  <Translate contentKey="starfirewebApp.jobBase.isSystemReserved">Is System Reserved</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/job-base" replace color="info">
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
  jobBaseEntity: storeState.jobBase.entity,
  loading: storeState.jobBase.loading,
  updating: storeState.jobBase.updating,
  updateSuccess: storeState.jobBase.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobBaseUpdate);
