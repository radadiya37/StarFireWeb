import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-passport.reducer';
import { IEmployeePassport } from 'app/shared/model/employee-passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeePassportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeePassportDetail = (props: IEmployeePassportDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeePassportEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeePassport.detail.title">EmployeePassport</Translate> [
          <b>{employeePassportEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="passportType">
              <Translate contentKey="starfirewebApp.employeePassport.passportType">Passport Type</Translate>
            </span>
          </dt>
          <dd>{employeePassportEntity.passportType}</dd>
          <dt>
            <span id="passportNo">
              <Translate contentKey="starfirewebApp.employeePassport.passportNo">Passport No</Translate>
            </span>
          </dt>
          <dd>{employeePassportEntity.passportNo}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="starfirewebApp.employeePassport.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {employeePassportEntity.issueDate ? (
              <TextFormat value={employeePassportEntity.issueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="expireDate">
              <Translate contentKey="starfirewebApp.employeePassport.expireDate">Expire Date</Translate>
            </span>
          </dt>
          <dd>
            {employeePassportEntity.expireDate ? (
              <TextFormat value={employeePassportEntity.expireDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeePassport.country">Country</Translate>
          </dt>
          <dd>{employeePassportEntity.country ? employeePassportEntity.country.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeePassport.employee">Employee</Translate>
          </dt>
          <dd>{employeePassportEntity.employee ? employeePassportEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-passport" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-passport/${employeePassportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeePassport }: IRootState) => ({
  employeePassportEntity: employeePassport.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePassportDetail);
