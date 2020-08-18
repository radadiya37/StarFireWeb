import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './education-institute.reducer';
import { IEducationInstitute } from 'app/shared/model/education-institute.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEducationInstituteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EducationInstituteDetail = (props: IEducationInstituteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { educationInstituteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.educationInstitute.detail.title">EducationInstitute</Translate> [
          <b>{educationInstituteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.educationInstitute.name">Name</Translate>
            </span>
          </dt>
          <dd>{educationInstituteEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="starfirewebApp.educationInstitute.address">Address</Translate>
            </span>
          </dt>
          <dd>{educationInstituteEntity.address}</dd>
        </dl>
        <Button tag={Link} to="/education-institute" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/education-institute/${educationInstituteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ educationInstitute }: IRootState) => ({
  educationInstituteEntity: educationInstitute.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EducationInstituteDetail);
