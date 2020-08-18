import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-education.reducer';
import { IEmployeeEducation } from 'app/shared/model/employee-education.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeEducationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeEducationDetail = (props: IEmployeeEducationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEducationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeEducation.detail.title">EmployeeEducation</Translate> [
          <b>{employeeEducationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="passedYear">
              <Translate contentKey="starfirewebApp.employeeEducation.passedYear">Passed Year</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.passedYear}</dd>
          <dt>
            <span id="cgpa">
              <Translate contentKey="starfirewebApp.employeeEducation.cgpa">Cgpa</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.cgpa}</dd>
          <dt>
            <span id="scale">
              <Translate contentKey="starfirewebApp.employeeEducation.scale">Scale</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.scale}</dd>
          <dt>
            <span id="hasForeignDegree">
              <Translate contentKey="starfirewebApp.employeeEducation.hasForeignDegree">Has Foreign Degree</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.hasForeignDegree ? 'true' : 'false'}</dd>
          <dt>
            <span id="isProfessional">
              <Translate contentKey="starfirewebApp.employeeEducation.isProfessional">Is Professional</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.isProfessional ? 'true' : 'false'}</dd>
          <dt>
            <span id="isLastEducation">
              <Translate contentKey="starfirewebApp.employeeEducation.isLastEducation">Is Last Education</Translate>
            </span>
          </dt>
          <dd>{employeeEducationEntity.isLastEducation ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeEducation.education">Education</Translate>
          </dt>
          <dd>{employeeEducationEntity.education ? employeeEducationEntity.education.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeEducation.grade">Grade</Translate>
          </dt>
          <dd>{employeeEducationEntity.grade ? employeeEducationEntity.grade.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeEducation.institute">Institute</Translate>
          </dt>
          <dd>{employeeEducationEntity.institute ? employeeEducationEntity.institute.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeEducation.employee">Employee</Translate>
          </dt>
          <dd>{employeeEducationEntity.employee ? employeeEducationEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-education" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-education/${employeeEducationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeEducation }: IRootState) => ({
  employeeEducationEntity: employeeEducation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEducationDetail);
