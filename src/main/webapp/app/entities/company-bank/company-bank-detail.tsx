import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company-bank.reducer';
import { ICompanyBank } from 'app/shared/model/company-bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyBankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyBankDetail = (props: ICompanyBankDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyBankEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="starfirewebApp.companyBank.detail.title">CompanyBank</Translate> [<b>{companyBankEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="starfirewebApp.companyBank.name">Name</Translate>
            </span>
          </dt>
          <dd>{companyBankEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="starfirewebApp.companyBank.address">Address</Translate>
            </span>
          </dt>
          <dd>{companyBankEntity.address}</dd>
          <dt>
            <span id="routingCode">
              <Translate contentKey="starfirewebApp.companyBank.routingCode">Routing Code</Translate>
            </span>
          </dt>
          <dd>{companyBankEntity.routingCode}</dd>
          <dt>
            <span id="accountName">
              <Translate contentKey="starfirewebApp.companyBank.accountName">Account Name</Translate>
            </span>
          </dt>
          <dd>{companyBankEntity.accountName}</dd>
          <dt>
            <span id="accountNo">
              <Translate contentKey="starfirewebApp.companyBank.accountNo">Account No</Translate>
            </span>
          </dt>
          <dd>{companyBankEntity.accountNo}</dd>
        </dl>
        <Button tag={Link} to="/company-bank" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company-bank/${companyBankEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ companyBank }: IRootState) => ({
  companyBankEntity: companyBank.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBankDetail);
