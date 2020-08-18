import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEmployeePassport } from 'app/shared/model/employee-passport.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './employee-passport.reducer';

export interface IEmployeePassportDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeePassportDeleteDialog = (props: IEmployeePassportDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/employee-passport');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.employeePassportEntity.id);
  };

  const { employeePassportEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.employeePassport.delete.question">
        <Translate contentKey="starfirewebApp.employeePassport.delete.question" interpolate={{ id: employeePassportEntity.id }}>
          Are you sure you want to delete this EmployeePassport?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-employeePassport" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ employeePassport }: IRootState) => ({
  employeePassportEntity: employeePassport.entity,
  updateSuccess: employeePassport.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePassportDeleteDialog);
