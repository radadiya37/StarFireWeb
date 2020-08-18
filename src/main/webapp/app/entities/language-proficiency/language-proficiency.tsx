import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './language-proficiency.reducer';
import { ILanguageProficiency } from 'app/shared/model/language-proficiency.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILanguageProficiencyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LanguageProficiency = (props: ILanguageProficiencyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { languageProficiencyList, match, loading } = props;
  return (
    <div>
      <h2 id="language-proficiency-heading">
        <Translate contentKey="starfirewebApp.languageProficiency.home.title">Language Proficiencies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="starfirewebApp.languageProficiency.home.createLabel">Create new Language Proficiency</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {languageProficiencyList && languageProficiencyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="starfirewebApp.languageProficiency.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {languageProficiencyList.map((languageProficiency, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${languageProficiency.id}`} color="link" size="sm">
                      {languageProficiency.id}
                    </Button>
                  </td>
                  <td>{languageProficiency.name}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${languageProficiency.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${languageProficiency.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${languageProficiency.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="starfirewebApp.languageProficiency.home.notFound">No Language Proficiencies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ languageProficiency }: IRootState) => ({
  languageProficiencyList: languageProficiency.entities,
  loading: languageProficiency.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProficiency);
