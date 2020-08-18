import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employment-category.reducer';
import { IEmploymentCategory } from 'app/shared/model/employment-category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmploymentCategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmploymentCategoryDetail = (props: IEmploymentCategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employmentCategoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.employmentCategory.detail.title">EmploymentCategory</Translate> [
          <b>{employmentCategoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.employmentCategory.name">Name</Translate>
            </span>
          </dt>
          <dd>{employmentCategoryEntity.name}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="starfirewebApp.employmentCategory.status">Status</Translate>
            </span>
          </dt>
          <dd>{employmentCategoryEntity.status ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/employment-category" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employment-category/${employmentCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employmentCategory }: IRootState) => ({
  employmentCategoryEntity: employmentCategory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentCategoryDetail);
