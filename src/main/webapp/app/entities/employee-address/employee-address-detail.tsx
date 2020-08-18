import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-address.reducer';
import { IEmployeeAddress } from 'app/shared/model/employee-address.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeAddressDetail = (props: IEmployeeAddressDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeAddressEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeAddress.detail.title">EmployeeAddress</Translate> [<b>{employeeAddressEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="starfirewebApp.employeeAddress.employee">Employee</Translate>
          </dt>
          <dd>{employeeAddressEntity.employee ? employeeAddressEntity.employee.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeAddress.presentAddress">Present Address</Translate>
          </dt>
          <dd>{employeeAddressEntity.presentAddress ? employeeAddressEntity.presentAddress.address : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeAddress.permanentAddress">Permanent Address</Translate>
          </dt>
          <dd>{employeeAddressEntity.permanentAddress ? employeeAddressEntity.permanentAddress.address : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-address" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-address/${employeeAddressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeAddress }: IRootState) => ({
  employeeAddressEntity: employeeAddress.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddressDetail);
