import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import RecruiterCreate from '.';
import { Button } from '@material-ui/core';
import { useStyles } from './modal.css.js';

export default function SimpleModal() {
  const classes = useStyles();

  const recruiterData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <RecruiterCreate handleClose={handleClose} />
    </div>
  );

  return (
    <div>
      <Button
        className={classes.addRecruiter}
        type="button"
        onClick={handleOpen}
      >
        {activeFolder
          ? 'Edit Recruiter'
          : 'Add Recruiter'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.centerModal}
      >
        {body}
      </Modal>
    </div>
  );
}
