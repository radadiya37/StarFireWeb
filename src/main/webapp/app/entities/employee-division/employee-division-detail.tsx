import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-division.reducer';
import { IEmployeeDivision } from 'app/shared/model/employee-division.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDivisionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDivisionDetail = (props: IEmployeeDivisionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeDivisionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeDivision.detail.title">EmployeeDivision</Translate> [
          <b>{employeeDivisionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="effectiveDate">
              <Translate contentKey="starfirewebApp.employeeDivision.effectiveDate">Effective Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeDivisionEntity.effectiveDate ? (
              <TextFormat value={employeeDivisionEntity.effectiveDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDivision.division">Division</Translate>
          </dt>
          <dd>{employeeDivisionEntity.division ? employeeDivisionEntity.division.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDivision.department">Department</Translate>
          </dt>
          <dd>{employeeDivisionEntity.department ? employeeDivisionEntity.department.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDivision.branch">Branch</Translate>
          </dt>
          <dd>{employeeDivisionEntity.branch ? employeeDivisionEntity.branch.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDivision.unit">Unit</Translate>
          </dt>
          <dd>{employeeDivisionEntity.unit ? employeeDivisionEntity.unit.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeDivision.employee">Employee</Translate>
          </dt>
          <dd>{employeeDivisionEntity.employee ? employeeDivisionEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-division" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-division/${employeeDivisionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeDivision }: IRootState) => ({
  employeeDivisionEntity: employeeDivision.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDivisionDetail);
