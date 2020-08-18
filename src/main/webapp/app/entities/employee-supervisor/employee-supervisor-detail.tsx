import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-supervisor.reducer';
import { IEmployeeSupervisor } from 'app/shared/model/employee-supervisor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeSupervisorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeSupervisorDetail = (props: IEmployeeSupervisorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeSupervisorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeSupervisor.detail.title">EmployeeSupervisor</Translate> [
          <b>{employeeSupervisorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="isDirectSupervisor">
              <Translate contentKey="starfirewebApp.employeeSupervisor.isDirectSupervisor">Is Direct Supervisor</Translate>
            </span>
          </dt>
          <dd>{employeeSupervisorEntity.isDirectSupervisor ? 'true' : 'false'}</dd>
          <dt>
            <span id="effectiveDate">
              <Translate contentKey="starfirewebApp.employeeSupervisor.effectiveDate">Effective Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeSupervisorEntity.effectiveDate ? (
              <TextFormat value={employeeSupervisorEntity.effectiveDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeSupervisor.employee">Employee</Translate>
          </dt>
          <dd>{employeeSupervisorEntity.employee ? employeeSupervisorEntity.employee.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeSupervisor.supervisor">Supervisor</Translate>
          </dt>
          <dd>{employeeSupervisorEntity.supervisor ? employeeSupervisorEntity.supervisor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-supervisor" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-supervisor/${employeeSupervisorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeSupervisor }: IRootState) => ({
  employeeSupervisorEntity: employeeSupervisor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSupervisorDetail);
