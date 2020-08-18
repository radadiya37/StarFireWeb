import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEmployeeTalent } from 'app/shared/model/employee-talent.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './employee-talent.reducer';

export interface IEmployeeTalentDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeTalentDeleteDialog = (props: IEmployeeTalentDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/employee-talent');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.employeeTalentEntity.id);
  };

  const { employeeTalentEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.employeeTalent.delete.question">
        <Translate contentKey="starfirewebApp.employeeTalent.delete.question" interpolate={{ id: employeeTalentEntity.id }}>
          Are you sure you want to delete this EmployeeTalent?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-employeeTalent" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ employeeTalent }: IRootState) => ({
  employeeTalentEntity: employeeTalent.entity,
  updateSuccess: employeeTalent.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTalentDeleteDialog);
