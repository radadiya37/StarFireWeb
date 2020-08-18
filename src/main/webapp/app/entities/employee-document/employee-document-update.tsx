import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { getEntities as getDocumentCategories } from 'app/entities/document-category/document-category.reducer';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { getEntities as getEmployeeBasicInfos } from 'app/entities/employee-basic-info/employee-basic-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-document.reducer';
import { IEmployeeDocument } from 'app/shared/model/employee-document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDocumentUpdate = (props: IEmployeeDocumentUpdateProps) => {
  const [documentCategoryId, setDocumentCategoryId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeDocumentEntity, documentCategories, employeeBasicInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-document');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDocumentCategories();
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
        ...employeeDocumentEntity,
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
          <h2 id="starfirewebApp.employeeDocument.home.createOrEditLabel">
            <Translate contentKey="starfirewebApp.employeeDocument.home.createOrEditLabel">Create or edit a EmployeeDocument</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeDocumentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="documentTitleLabel" for="employee-document-documentTitle">
                  <Translate contentKey="starfirewebApp.employeeDocument.documentTitle">Document Title</Translate>
                </Label>
                <AvField
                  id="employee-document-documentTitle"
                  type="text"
                  name="documentTitle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="documentPathLabel" for="employee-document-documentPath">
                  <Translate contentKey="starfirewebApp.employeeDocument.documentPath">Document Path</Translate>
                </Label>
                <AvField
                  id="employee-document-documentPath"
                  type="text"
                  name="documentPath"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="employee-document-remarks">
                  <Translate contentKey="starfirewebApp.employeeDocument.remarks">Remarks</Translate>
                </Label>
                <AvField
                  id="employee-document-remarks"
                  type="text"
                  name="remarks"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-document-documentCategory">
                  <Translate contentKey="starfirewebApp.employeeDocument.documentCategory">Document Category</Translate>
                </Label>
                <AvInput id="employee-document-documentCategory" type="select" className="form-control" name="documentCategory.id">
                  <option value="" key="0" />
                  {documentCategories
                    ? documentCategories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-document-employee">
                  <Translate contentKey="starfirewebApp.employeeDocument.employee">Employee</Translate>
                </Label>
                <AvInput
                  id="employee-document-employee"
                  type="select"
                  className="form-control"
                  name="employee.id"
                  value={isNew ? employeeBasicInfos[0] && employeeBasicInfos[0].id : employeeDocumentEntity.employee?.id}
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
              <Button tag={Link} id="cancel-save" to="/employee-document" replace color="info">
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
  documentCategories: storeState.documentCategory.entities,
  employeeBasicInfos: storeState.employeeBasicInfo.entities,
  employeeDocumentEntity: storeState.employeeDocument.entity,
  loading: storeState.employeeDocument.loading,
  updating: storeState.employeeDocument.updating,
  updateSuccess: storeState.employeeDocument.updateSuccess,
});

const mapDispatchToProps = {
  getDocumentCategories,
  getEmployeeBasicInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDocumentUpdate);
