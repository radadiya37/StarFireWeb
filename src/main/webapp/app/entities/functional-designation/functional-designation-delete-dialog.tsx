import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IFunctionalDesignation } from 'app/shared/model/functional-designation.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './functional-designation.reducer';

export interface IFunctionalDesignationDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FunctionalDesignationDeleteDialog = (props: IFunctionalDesignationDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/functional-designation' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.functionalDesignationEntity.id);
  };

  const { functionalDesignationEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.functionalDesignation.delete.question">
        <Translate contentKey="starfirewebApp.functionalDesignation.delete.question" interpolate={{ id: functionalDesignationEntity.id }}>
          Are you sure you want to delete this FunctionalDesignation?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-functionalDesignation" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ functionalDesignation }: IRootState) => ({
  functionalDesignationEntity: functionalDesignation.entity,
  updateSuccess: functionalDesignation.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalDesignationDeleteDialog);
