import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-family.reducer';
import { IEmployeeFamily } from 'app/shared/model/employee-family.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeFamilyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeFamilyDetail = (props: IEmployeeFamilyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeFamilyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeFamily.detail.title">EmployeeFamily</Translate> [<b>{employeeFamilyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.employeeFamily.name">Name</Translate>
            </span>
          </dt>
          <dd>{employeeFamilyEntity.name}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="starfirewebApp.employeeFamily.dob">Dob</Translate>
            </span>
          </dt>
          <dd>
            {employeeFamilyEntity.dob ? <TextFormat value={employeeFamilyEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="nid">
              <Translate contentKey="starfirewebApp.employeeFamily.nid">Nid</Translate>
            </span>
          </dt>
          <dd>{employeeFamilyEntity.nid}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="starfirewebApp.employeeFamily.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{employeeFamilyEntity.phone}</dd>
          <dt>
            <span id="profession">
              <Translate contentKey="starfirewebApp.employeeFamily.profession">Profession</Translate>
            </span>
          </dt>
          <dd>{employeeFamilyEntity.profession}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="starfirewebApp.employeeFamily.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{employeeFamilyEntity.gender}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeFamily.employeeRelationship">Employee Relationship</Translate>
          </dt>
          <dd>{employeeFamilyEntity.employeeRelationship ? employeeFamilyEntity.employeeRelationship.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-family" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-family/${employeeFamilyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeFamily }: IRootState) => ({
  employeeFamilyEntity: employeeFamily.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFamilyDetail);
