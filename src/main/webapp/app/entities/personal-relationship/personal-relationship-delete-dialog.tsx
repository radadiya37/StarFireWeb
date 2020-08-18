import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPersonalRelationship } from 'app/shared/model/personal-relationship.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './personal-relationship.reducer';

export interface IPersonalRelationshipDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonalRelationshipDeleteDialog = (props: IPersonalRelationshipDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/personal-relationship');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.personalRelationshipEntity.id);
  };

  const { personalRelationshipEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.personalRelationship.delete.question">
        <Translate contentKey="starfirewebApp.personalRelationship.delete.question" interpolate={{ id: personalRelationshipEntity.id }}>
          Are you sure you want to delete this PersonalRelationship?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-personalRelationship" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ personalRelationship }: IRootState) => ({
  personalRelationshipEntity: personalRelationship.entity,
  updateSuccess: personalRelationship.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonalRelationshipDeleteDialog);
