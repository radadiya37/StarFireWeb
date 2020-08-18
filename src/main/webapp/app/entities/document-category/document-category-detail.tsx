import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document-category.reducer';
import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentCategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentCategoryDetail = (props: IDocumentCategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { documentCategoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.documentCategory.detail.title">DocumentCategory</Translate> [
          <b>{documentCategoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.documentCategory.name">Name</Translate>
            </span>
          </dt>
          <dd>{documentCategoryEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="starfirewebApp.documentCategory.description">Description</Translate>
            </span>
          </dt>
          <dd>{documentCategoryEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/document-category" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document-category/${documentCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ documentCategory }: IRootState) => ({
  documentCategoryEntity: documentCategory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentCategoryDetail);
