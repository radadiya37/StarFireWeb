import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-warning.reducer';
import { IEmployeeWarning } from 'app/shared/model/employee-warning.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeWarningDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeWarningDetail = (props: IEmployeeWarningDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeWarningEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeWarning.detail.title">EmployeeWarning</Translate> [<b>{employeeWarningEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="warning">
              <Translate contentKey="starfirewebApp.employeeWarning.warning">Warning</Translate>
            </span>
          </dt>
          <dd>{employeeWarningEntity.warning}</dd>
          <dt>
            <span id="action">
              <Translate contentKey="starfirewebApp.employeeWarning.action">Action</Translate>
            </span>
          </dt>
          <dd>{employeeWarningEntity.action}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeWarning.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeWarningEntity.remarks}</dd>
          <dt>
            <span id="isActionType">
              <Translate contentKey="starfirewebApp.employeeWarning.isActionType">Is Action Type</Translate>
            </span>
          </dt>
          <dd>{employeeWarningEntity.isActionType ? 'true' : 'false'}</dd>
          <dt>
            <span id="warningDate">
              <Translate contentKey="starfirewebApp.employeeWarning.warningDate">Warning Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeWarningEntity.warningDate ? (
              <TextFormat value={employeeWarningEntity.warningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeWarning.warnedEmployee">Warned Employee</Translate>
          </dt>
          <dd>{employeeWarningEntity.warnedEmployee ? employeeWarningEntity.warnedEmployee.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeWarning.warnedBy">Warned By</Translate>
          </dt>
          <dd>{employeeWarningEntity.warnedBy ? employeeWarningEntity.warnedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeWarning.warningType">Warning Type</Translate>
          </dt>
          <dd>{employeeWarningEntity.warningType ? employeeWarningEntity.warningType.warningType : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-warning" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-warning/${employeeWarningEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeWarning }: IRootState) => ({
  employeeWarningEntity: employeeWarning.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWarningDetail);
