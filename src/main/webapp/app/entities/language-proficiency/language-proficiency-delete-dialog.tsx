import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILanguageProficiency } from 'app/shared/model/language-proficiency.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './language-proficiency.reducer';

export interface ILanguageProficiencyDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LanguageProficiencyDeleteDialog = (props: ILanguageProficiencyDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/language-proficiency');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.languageProficiencyEntity.id);
  };

  const { languageProficiencyEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.languageProficiency.delete.question">
        <Translate contentKey="starfirewebApp.languageProficiency.delete.question" interpolate={{ id: languageProficiencyEntity.id }}>
          Are you sure you want to delete this LanguageProficiency?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-languageProficiency" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ languageProficiency }: IRootState) => ({
  languageProficiencyEntity: languageProficiency.entity,
  updateSuccess: languageProficiency.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProficiencyDeleteDialog);
