import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-award.reducer';
import { IEmployeeAward } from 'app/shared/model/employee-award.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeAwardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeAwardDetail = (props: IEmployeeAwardDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeAwardEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeAward.detail.title">EmployeeAward</Translate> [<b>{employeeAwardEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="awardDate">
              <Translate contentKey="starfirewebApp.employeeAward.awardDate">Award Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeAwardEntity.awardDate ? (
              <TextFormat value={employeeAwardEntity.awardDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="awardName">
              <Translate contentKey="starfirewebApp.employeeAward.awardName">Award Name</Translate>
            </span>
          </dt>
          <dd>{employeeAwardEntity.awardName}</dd>
          <dt>
            <span id="gift">
              <Translate contentKey="starfirewebApp.employeeAward.gift">Gift</Translate>
            </span>
          </dt>
          <dd>{employeeAwardEntity.gift}</dd>
          <dt>
            <span id="prizeAmount">
              <Translate contentKey="starfirewebApp.employeeAward.prizeAmount">Prize Amount</Translate>
            </span>
          </dt>
          <dd>{employeeAwardEntity.prizeAmount}</dd>
          <dt>
            <span id="awardCertificatePath">
              <Translate contentKey="starfirewebApp.employeeAward.awardCertificatePath">Award Certificate Path</Translate>
            </span>
          </dt>
          <dd>{employeeAwardEntity.awardCertificatePath}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeAward.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeAwardEntity.remarks}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeAward.awardType">Award Type</Translate>
          </dt>
          <dd>{employeeAwardEntity.awardType ? employeeAwardEntity.awardType.awardType : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeAward.employee">Employee</Translate>
          </dt>
          <dd>{employeeAwardEntity.employee ? employeeAwardEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-award" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-award/${employeeAwardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeAward }: IRootState) => ({
  employeeAwardEntity: employeeAward.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAwardDetail);
