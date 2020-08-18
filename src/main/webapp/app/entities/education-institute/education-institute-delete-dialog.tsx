import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEducationInstitute } from 'app/shared/model/education-institute.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './education-institute.reducer';

export interface IEducationInstituteDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EducationInstituteDeleteDialog = (props: IEducationInstituteDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/education-institute' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.educationInstituteEntity.id);
  };

  const { educationInstituteEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="starfirewebApp.educationInstitute.delete.question">
        <Translate contentKey="starfirewebApp.educationInstitute.delete.question" interpolate={{ id: educationInstituteEntity.id }}>
          Are you sure you want to delete this EducationInstitute?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-educationInstitute" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ educationInstitute }: IRootState) => ({
  educationInstituteEntity: educationInstitute.entity,
  updateSuccess: educationInstitute.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EducationInstituteDeleteDialog);
