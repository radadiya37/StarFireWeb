import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-bank.reducer';
import { IEmployeeBank } from 'app/shared/model/employee-bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeBankDetail = (props: IEmployeeBankDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeBankEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeBank.detail.title">EmployeeBank</Translate> [<b>{employeeBankEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.employeeBank.name">Name</Translate>
            </span>
          </dt>
          <dd>{employeeBankEntity.name}</dd>
          <dt>
            <span id="routingCode">
              <Translate contentKey="starfirewebApp.employeeBank.routingCode">Routing Code</Translate>
            </span>
          </dt>
          <dd>{employeeBankEntity.routingCode}</dd>
          <dt>
            <span id="accountNo">
              <Translate contentKey="starfirewebApp.employeeBank.accountNo">Account No</Translate>
            </span>
          </dt>
          <dd>{employeeBankEntity.accountNo}</dd>
          <dt>
            <span id="accountName">
              <Translate contentKey="starfirewebApp.employeeBank.accountName">Account Name</Translate>
            </span>
          </dt>
          <dd>{employeeBankEntity.accountName}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeBank.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeBankEntity.remarks}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeBank.employee">Employee</Translate>
          </dt>
          <dd>{employeeBankEntity.employee ? employeeBankEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-bank" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-bank/${employeeBankEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeBank }: IRootState) => ({
  employeeBankEntity: employeeBank.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBankDetail);
