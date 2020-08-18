import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEmployeeLanguage } from 'app/shared/model/employee-language.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './employee-language.reducer';

export interface IEmployeeLanguageDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeLanguageDeleteDialog = (props: IEmployeeLanguageDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/employee-language');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.employeeLanguageEntity.id);
  };

  const { employeeLanguageEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.employeeLanguage.delete.question">
        <Translate contentKey="starfirewebApp.employeeLanguage.delete.question" interpolate={{ id: employeeLanguageEntity.id }}>
          Are you sure you want to delete this EmployeeLanguage?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-employeeLanguage" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ employeeLanguage }: IRootState) => ({
  employeeLanguageEntity: employeeLanguage.entity,
  updateSuccess: employeeLanguage.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLanguageDeleteDialog);
