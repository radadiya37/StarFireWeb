import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './employee-basic-info.reducer';

export interface IEmployeeBasicInfoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeBasicInfoDeleteDialog = (props: IEmployeeBasicInfoDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/employee-basic-info');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.employeeBasicInfoEntity.id);
  };

  const { employeeBasicInfoEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.employeeBasicInfo.delete.question">
        <Translate contentKey="starfirewebApp.employeeBasicInfo.delete.question" interpolate={{ id: employeeBasicInfoEntity.id }}>
          Are you sure you want to delete this EmployeeBasicInfo?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-employeeBasicInfo" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ employeeBasicInfo }: IRootState) => ({
  employeeBasicInfoEntity: employeeBasicInfo.entity,
  updateSuccess: employeeBasicInfo.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBasicInfoDeleteDialog);
