import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company-bank.reducer';
import { ICompanyBank } from 'app/shared/model/company-bank.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyBankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyBankUpdate = (props: ICompanyBankUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companyBankEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/company-bank');
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
        ...companyBankEntity,
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
          <h2 id="starfirewebApp.companyBank.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.companyBank.home.createOrEditLabel">Create or edit a CompanyBank</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companyBankEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="company-bank-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="company-bank-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="company-bank-name">
                  <Translate contentKey="starfirewebApp.companyBank.name">Name</Translate>
                </Label>
                <AvField
                  id="company-bank-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="company-bank-address">
                  <Translate contentKey="starfirewebApp.companyBank.address">Address</Translate>
                </Label>
                <AvField
                  id="company-bank-address"
                  type="text"
                  name="address"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="routingCodeLabel" for="company-bank-routingCode">
                  <Translate contentKey="starfirewebApp.companyBank.routingCode">Routing Code</Translate>
                </Label>
                <AvField
                  id="company-bank-routingCode"
                  type="text"
                  name="routingCode"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="accountNameLabel" for="company-bank-accountName">
                  <Translate contentKey="starfirewebApp.companyBank.accountName">Account Name</Translate>
                </Label>
                <AvField
                  id="company-bank-accountName"
                  type="text"
                  name="accountName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="accountNoLabel" for="company-bank-accountNo">
                  <Translate contentKey="starfirewebApp.companyBank.accountNo">Account No</Translate>
                </Label>
                <AvField
                  id="company-bank-accountNo"
                  type="text"
                  name="accountNo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/company-bank" replace color="info">
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
  companyBankEntity: storeState.companyBank.entity,
  loading: storeState.companyBank.loading,
  updating: storeState.companyBank.updating,
  updateSuccess: storeState.companyBank.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBankUpdate);
