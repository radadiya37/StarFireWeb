import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-talent.reducer';
import { IEmployeeTalent } from 'app/shared/model/employee-talent.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeTalentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeTalentDetail = (props: IEmployeeTalentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeTalentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeTalent.detail.title">EmployeeTalent</Translate> [<b>{employeeTalentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="remarks">
              <Translate contentKey="starfirewebApp.employeeTalent.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{employeeTalentEntity.remarks}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeTalent.talentType">Talent Type</Translate>
          </dt>
          <dd>{employeeTalentEntity.talentType ? employeeTalentEntity.talentType.talentType : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeTalent.employee">Employee</Translate>
          </dt>
          <dd>{employeeTalentEntity.employee ? employeeTalentEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-talent" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-talent/${employeeTalentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeTalent }: IRootState) => ({
  employeeTalentEntity: employeeTalent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTalentDetail);
