import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-document.reducer';
import { IEmployeeDocument } from 'app/shared/model/employee-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmployeeDocument = (props: IEmployeeDocumentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { employeeDocumentList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-document-heading">
        <Translate contentKey="starfirewebApp.employeeDocument.home.title">Employee Documents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.employeeDocument.home.createLabel">Create new Employee Document</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeDocumentList && employeeDocumentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDocument.documentTitle">Document Title</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDocument.documentPath">Document Path</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDocument.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDocument.documentCategory">Document Category</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.employeeDocument.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeDocumentList.map((employeeDocument, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeDocument.id}`} color="link" size="sm">
                      {employeeDocument.id}
                    </Button>
                  </td>
                  <td>{employeeDocument.documentTitle}</td>
                  <td>{employeeDocument.documentPath}</td>
                  <td>{employeeDocument.remarks}</td>
                  <td>
                    {employeeDocument.documentCategory ? (
                      <Link to={`document-category/${employeeDocument.documentCategory.id}`}>{employeeDocument.documentCategory.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeDocument.employee ? (
                      <Link to={`employee-basic-info/${employeeDocument.employee.id}`}>{employeeDocument.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeDocument.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeDocument.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeDocument.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="starfirewebApp.employeeDocument.home.notFound">No Employee Documents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employeeDocument }: IRootState) => ({
  employeeDocumentList: employeeDocument.entities,
  loading: employeeDocument.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDocument);
