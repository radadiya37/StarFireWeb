import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITimeZone } from 'app/shared/model/time-zone.model';
import { getEntities as getTimeZones } from 'app/entities/time-zone/time-zone.reducer';
import { getEntity, updateEntity, createEntity, reset } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBranchUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BranchUpdate = (props: IBranchUpdateProps) => {
  const [timeZoneId, setTimeZoneId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { branchEntity, timeZones, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/branch');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTimeZones();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...branchEntity,
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
          <h2 id="starfirewebApp.branch.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.branch.home.createOrEditLabel">Create or edit a Branch</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : branchEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="branch-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="branch-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="branch-name">
                  <Translate contentKey="starfirewebApp.branch.name">Name</Translate>
                </Label>
                <AvField
                  id="branch-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                    pattern: { value: '[A-Za-z]+', errorMessage: translate('entity.validation.pattern', { pattern: '[A-Za-z]+' }) },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isRemoteAttendanceAllowedLabel">
                  <AvInput
                    id="branch-isRemoteAttendanceAllowed"
                    type="checkbox"
                    className="form-check-input"
                    name="isRemoteAttendanceAllowed"
                  />
                  <Translate contentKey="starfirewebApp.branch.isRemoteAttendanceAllowed">Is Remote Attendance Allowed</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="radiusInMeterLabel" for="branch-radiusInMeter">
                  <Translate contentKey="starfirewebApp.branch.radiusInMeter">Radius In Meter</Translate>
                </Label>
                <AvField id="branch-radiusInMeter" type="string" className="form-control" name="radiusInMeter" />
              </AvGroup>
              <AvGroup check>
                <Label id="isHeadOfficeLabel">
                  <AvInput id="branch-isHeadOffice" type="checkbox" className="form-check-input" name="isHeadOffice" />
                  <Translate contentKey="starfirewebApp.branch.isHeadOffice">Is Head Office</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="branch-timeZone">
                  <Translate contentKey="starfirewebApp.branch.timeZone">Time Zone</Translate>
                </Label>
                <AvInput
                  id="branch-timeZone"
                  type="select"
                  className="form-control"
                  name="timeZone.id"
                  value={isNew ? timeZones[0] && timeZones[0].id : branchEntity.timeZone?.id}
                  required
                >
                  {timeZones
                    ? timeZones.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/branch" replace color="info">
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
  timeZones: storeState.timeZone.entities,
  branchEntity: storeState.branch.entity,
  loading: storeState.branch.loading,
  updating: storeState.branch.updating,
  updateSuccess: storeState.branch.updateSuccess,
});

const mapDispatchToProps = {
  getTimeZones,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BranchUpdate);
