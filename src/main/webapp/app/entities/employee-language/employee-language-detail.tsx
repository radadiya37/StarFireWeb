import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-language.reducer';
import { IEmployeeLanguage } from 'app/shared/model/employee-language.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeLanguageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeLanguageDetail = (props: IEmployeeLanguageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeLanguageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employeeLanguage.detail.title">EmployeeLanguage</Translate> [
          <b>{employeeLanguageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="starfirewebApp.employeeLanguage.employee">Employee</Translate>
          </dt>
          <dd>{employeeLanguageEntity.employee ? employeeLanguageEntity.employee.id : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeLanguage.language">Language</Translate>
          </dt>
          <dd>{employeeLanguageEntity.language ? employeeLanguageEntity.language.name : ''}</dd>
          <dt>
            <Translate contentKey="starfirewebApp.employeeLanguage.languageProficiency">Language Proficiency</Translate>
          </dt>
          <dd>{employeeLanguageEntity.languageProficiency ? employeeLanguageEntity.languageProficiency.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee-language" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee-language/${employeeLanguageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employeeLanguage }: IRootState) => ({
  employeeLanguageEntity: employeeLanguage.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLanguageDetail);
