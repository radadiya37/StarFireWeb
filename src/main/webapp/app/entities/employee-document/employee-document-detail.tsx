import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-document.reducer';
import { IEmployeeDocument } from 'app/shared/model/employee-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDocumentDetail = (props: IEmployeeDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeDocumentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeDocument.detail.title">EmployeeDocument</Translate> [
          <b>{employeeDocumentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="documentTitle">
              <Translate contentKey="starfirewebApp.employeeDocument.documentTitle">Document Title</Translate>
            </span>
          </dt>
          <dd>{employeeDocumentEntity.documentTitle}</dd>
          <dt>
            <span id="documentPath">
              <Translate contentKey="starfirewebApp.employeeDocument.documentPath">Document Path</Translate>
            </span>
          </dt>
          <dd>{employeeDocumentEntity.documentPath}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeDocument.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeDocumentEntity.remarks}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDocument.documentCategory">Document Category</Translate>
          </dt>
          <dd>{employeeDocumentEntity.documentCategory ? employeeDocumentEntity.documentCategory.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDocument.employee">Employee</Translate>
          </dt>
          <dd>{employeeDocumentEntity.employee ? employeeDocumentEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-document/${employeeDocumentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeDocument }: IRootState) => ({
  employeeDocumentEntity: employeeDocument.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDocumentDetail);
