import React, { useEffect } from 'react';
import CandidateCard from '../CandidateCard';
import { useSelector } from 'react-redux';
import { useStyles } from './styles.js';

import { useDispatch } from 'react-redux';
import { removeCandidateFromFolder } from '../../redux/foldersReducer/Action';
import {
  addNewComment,
  editComment,
  getCommentsByFolderId,
  deleteComment,
} from '../../redux/commentsReducer/Action';
import {
  FormControl,
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Backdrop,
  Fade,
  Select,
} from '@material-ui/core';
import Comments from '../Comments/index';

function Folder(props) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddComment, setOpenAddComment] = React.useState(false);
  const [openEditComment, setOpenEditComment] = React.useState(false);
  const [openDeleteComment, setOpenDeleteComment] = React.useState(false);
  const [inputTextField, setInputTextField] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('selector');
  const [idCandidate, setIdCandidate] = React.useState(0);
  const [idComment, setIdComment] = React.useState(0);
  const DEFAULT_ROWS_PER_PAGE = 30;
  const classes = useStyles();
  const dispatch = useDispatch();
  const folders = useSelector((store) => store.FolderReducer.allFolders);
  const comments = useSelector(
    (store) => store.CommentsReducer.allCommentsByFolderId
  );
  const path = window.location.pathname.split('/folder/');
  let findFolder = folders.find((folder) => folder.uuid === path[1]) || {};
  const REMOVE_CANDIDATE_FROM_FOLDER = 'delete';
  const ADD_COMMENT_CLICK_ACTION = 'addComment';
  const EDIT_COMMENT_CLICK_ACTION = 'editComment';
  const DELETE_COMMENT_CLICK_ACTION = 'deleteComment';

  let folderObject = {};
  if (folders.length) {
    folderObject = {
      candidates: findFolder.candidates,
      selector: `${findFolder.user.firstName} ${findFolder.user.lastName}`,
      recruiterId: findFolder.recruiter.id,
      recruiter: findFolder.recruiter.contactName,
      company: findFolder.recruiter.company,
      email: findFolder.recruiter.email,
      idFolder: findFolder.id,
    };
  }

  useEffect(() => {
    dispatch(getCommentsByFolderId(findFolder.id));
  }, [findFolder]);

  const recruiterComment = comments.find(
    (comment) => comment.recruiterId === folderObject.recruiterId
  );
  const selectorComments = comments.filter(
    (comment) => comment.recruiterId !== folderObject.recruiterId
  );

  selectorComments.sort((a, b) => a.id - b.id);

  const createRows = (selectorComents, commentForRecruiter) => {
    return { selectorComents, commentForRecruiter };
  };

  const rows = [createRows(selectorComments, recruiterComment)];

  const onClickRemoveCandidate = (e) => {
    e.preventDefault();
    dispatch(removeCandidateFromFolder(folderObject.idFolder, idCandidate));
    handleClose(REMOVE_CANDIDATE_FROM_FOLDER);
  };
  const onClickDeleteComment = (e) => {
    e.preventDefault();
    dispatch(deleteComment(idComment));
    handleClose(DELETE_COMMENT_CLICK_ACTION);
  };

  const handleClickOpen = (id, action) => {
    if (action === REMOVE_CANDIDATE_FROM_FOLDER) {
      setOpenDelete(true);
      setIdCandidate(id);
    }
    if (action === ADD_COMMENT_CLICK_ACTION) {
      setOpenAddComment(true);
    }
    if (action === EDIT_COMMENT_CLICK_ACTION) {
      setIdComment(id);
      setOpenEditComment(true);
    }
    if (action === DELETE_COMMENT_CLICK_ACTION) {
      setIdComment(id);
      setOpenDeleteComment(true);
    }
  };

  const handleClose = (action) => {
    if (action === REMOVE_CANDIDATE_FROM_FOLDER) setOpenDelete(false);
    if (action === ADD_COMMENT_CLICK_ACTION) setOpenAddComment(false);
    if (action === EDIT_COMMENT_CLICK_ACTION) setOpenEditComment(false);
    if (action === DELETE_COMMENT_CLICK_ACTION) setOpenDeleteComment(false);
  };

  const handleSaveComment = (e, action) => {
    e.preventDefault();
    const selectorId = 1; //TODO: este es el ID del usuario autenticado que escribio el comentario por el momento se hardcodea
    const datas = {};

    if (action === ADD_COMMENT_CLICK_ACTION) {
      if (selectValue === 'selector') datas.userId = selectorId;
      if (selectValue === 'recruiter') {
        datas.userId = selectorId;
        datas.recruiterId = folderObject.recruiterId;
      }
      datas.folderId = findFolder.id;
      datas.content = inputTextField;

      dispatch(addNewComment(datas));
      setSelectValue('selector');
      setInputTextField('');
      handleClose(ADD_COMMENT_CLICK_ACTION);
    }

    if (action === EDIT_COMMENT_CLICK_ACTION) {
      datas.commentId = idComment;
      datas.content = inputTextField;
      dispatch(editComment(datas));
      handleClose(EDIT_COMMENT_CLICK_ACTION);
      setInputTextField('');
    }
  };

  const RemoveCandidateModal = () => (
    <Dialog
      open={openDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta por eliminar un candidato de esta carpeta!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione en el boton eliminar para realizar la acción o de lo
          contrario en cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(REMOVE_CANDIDATE_FROM_FOLDER)}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={(e) => onClickRemoveCandidate(e)}
          color="primary"
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const addCommentModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openAddComment}
      onClose={() => handleClose(ADD_COMMENT_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAddComment}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Agregar Comentario </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    setInputTextField(e.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </FormControl>
            </div>
            <div>
              {' '}
              <h4> Dirigido A </h4>{' '}
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  name="selectorOrRecruiter"
                  defaultValue="selector"
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                >
                  <MenuItem value="selector"> Selector </MenuItem>
                  {!recruiterComment && (
                    <MenuItem value="recruiter"> Reclutador </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button onClick={() => handleClose(ADD_COMMENT_CLICK_ACTION)}>
                {' '}
                Cancelar{' '}
              </Button>
              <Button
                onClick={(e) => handleSaveComment(e, ADD_COMMENT_CLICK_ACTION)}
              >
                {' '}
                Guardar{' '}
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );

  const editCommentModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openEditComment}
      onClose={() => handleClose(EDIT_COMMENT_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openEditComment}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Editar Comentario </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    setInputTextField(e.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </FormControl>
            </div>
            <div>
              <Button onClick={() => handleClose(EDIT_COMMENT_CLICK_ACTION)}>
                {' '}
                Cancelar{' '}
              </Button>
              <Button
                onClick={(e) => handleSaveComment(e, EDIT_COMMENT_CLICK_ACTION)}
              >
                {' '}
                Guardar{' '}
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );

  const deleteCommentModal = () => (
    <Dialog
      open={openDeleteComment}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta por eliminar este comentario!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione en el boton eliminar para realizar la acción o de lo
          contrario en cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(DELETE_COMMENT_CLICK_ACTION)}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={(e) => onClickDeleteComment(e)}
          color="primary"
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.background}>
      <h2> CARPETA PARA: {folderObject.company} </h2>
      <h2> SELECTOR: {folderObject.selector} </h2>
      <h2> RECRUITER: {folderObject.recruiter} </h2>
      <h2> EMAIL: {folderObject.email} </h2>

      <Container className={classes.container} maxWidth="xl">
        <Grid
          className={classes.paddingCandidates}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {folders.length &&
            folderObject.candidates &&
            folderObject.candidates.map(
              (candidate, index) =>
                index < DEFAULT_ROWS_PER_PAGE &&
                candidate.visibility === 'listed' && (
                  <div key={index} className={classes.CandidateCard}>
                    <CandidateCard candidate={candidate} />
                    {findFolder && findFolder.status === 'sent' ? (
                      <div> </div>
                    ) : (
                      <Button
                        onClick={() => {
                          handleClickOpen(
                            candidate.id,
                            REMOVE_CANDIDATE_FROM_FOLDER
                          );
                        }}
                      >
                        {' '}
                        Delete this Candidate{' '}
                      </Button>
                    )}
                  </div>
                )
            )}
        </Grid>
        <Comments rows={rows} handleClickOpen={handleClickOpen} />
        <Grid>
          {' '}
          {findFolder && findFolder.status === 'sent' ? (
            <div> </div>
          ) : (
            <Button
              onClick={() => handleClickOpen(0, ADD_COMMENT_CLICK_ACTION)}
            >
              {' '}
              Agregar comentario{' '}
            </Button>
          )}
        </Grid>
      </Container>
      {addCommentModal()}
      {RemoveCandidateModal()}
      {editCommentModal()}
      {deleteCommentModal()}
    </div>
  );
}
export default Folder;
