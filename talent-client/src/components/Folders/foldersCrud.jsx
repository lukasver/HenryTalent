import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import { deleteFolder, updateFolder, getAllFolders } from '../../redux/foldersReducer/Action';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
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

function FoldersCrud() {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState({
    recruiter: false,
    user: false,
  });
  const [idFolder, setIdFolder] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const classes = useStyles();
  const folders = useSelector((store) => store.FolderReducer.allFolders);
  const [folderData, setFolderData] = React.useState({});
  const recruiters = useSelector(
    (store) => store.RecruitersReducer.allRecruiters
  );
  const users = useSelector((store) => store.UsersReducer.allUsers);
  const UPDATE_CLICK_ACTION = 'update';
  const DATE_FORMAT = 'YYYY/MM/DD - HH:mm:ss';
  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'selector', label: 'SELECTOR', minWidth: 100 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
    { id: 'createAt', label: 'CREATE AT', minWidth: 100 },
    { id: 'sentAt', label: 'SENT AT', minWidth: 100 },
    { id: 'opened', label: 'OPENED', minWidth: 100 },
    { id: 'recruiter', label: 'RECRUITER', minWidth: 100 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'company', label: 'COMPANY', minWidth: 100 },
    { id: 'edit', label: '', minWidth: 50 },
    { id: 'delete', label: '', minWidth: 50 },
  ];
  const rows = [];
  const EDIT_FOLDER_SELECTOR_OR_RECRUITER = 'edit';
  const STATUS_CREATED = 'created';
  const STATUS_DRAFT = 'draft';

  const findRecruiter = (recruiterId, searchFor) => {
    const recruiter =
      recruiters &&
      recruiters.find((recruiter) => recruiter.id === recruiterId);
    return recruiter && recruiter[searchFor];
  };

  const findUser = (userId, searchFor) => {
    const user = users && users.find((user) => user.id === userId);
    return user && user[searchFor];
  };

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const draftFolder = useSelector((store) => store.FolderReducer.draftFolder);

  if (folders) {
    folders
      .sort((a, b) => a.id - b.id)
      .map((folders) => {
        return rows.push({
          id: folders.id,
          uuid: folders.uuid,
          selector: `${findUser(folders.userId, 'firstName')} ${findUser(
            folders.userId,
            'lastName'
          )}`,
          status: folders.status,
          createAt: moment(folders.createdAt).format(DATE_FORMAT),
          sentAt:
            folders.sentAt === null
              ? ' '
              : moment(folders.sentAt).format(DATE_FORMAT),
          opened: folders.opened.toString(),
          recruiter: findRecruiter(folders.recruiterId, 'contactName'),
          email: findRecruiter(folders.recruiterId, 'email'),
          company: findRecruiter(folders.recruiterId, 'company'),
          key: folders.id,
        });
      });
  }

  useEffect(() => {}, [folders]);

  useEffect(() => {
    getAllFolders();
  }, [activeFolder, draftFolder]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickDelete = (id) => {
    setIdFolder(id);
    setOpen(true);
  };
  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteFolder(idFolder));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  const handleOpenSelect = (open) => {
    open === 'user'
      ? setOpenSelect({ user: true })
      : setOpenSelect({ recruiter: true });
  };
  const handleCloseSelect = (close) => {
    close === 'user'
      ? setOpenSelect({ user: false })
      : setOpenSelect({ recruiter: false });
  };

  const handleChangeSelect = (e) => {
    setFolderData({
      ...folderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = (id, action) => {
    if (action === UPDATE_CLICK_ACTION) {
      setOpenUpdate(true);
    }
    setIdFolder(id);
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    dispatch(updateFolder(idFolder, folderData));
    setFolderData({});
    setOpenUpdate(false);
  };

  const EditFolderModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openUpdate}
      onClose={() => handleClose(UPDATE_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openUpdate}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Actualizar Carpeta </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formControl}>
              <InputLabel>Selector</InputLabel>
              <Select
                name="userId"
                open={openSelect.user}
                onClose={() => handleCloseSelect('user')}
                onOpen={() => handleOpenSelect('user')}
                onChange={(e) => {
                  handleChangeSelect(e);
                }}
              >
                {users &&
                  users.map((user, index) => {
                    return (
                      <MenuItem value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Recruiter</InputLabel>
              <Select
                name="recruiterId"
                open={openSelect.recruiter}
                onClose={() => handleCloseSelect('recruiter')}
                onOpen={() => handleOpenSelect('recruiter')}
                onChange={(e) => {
                  handleChangeSelect(e);
                }}
              >
                {recruiters &&
                  recruiters.map((recruiter, index) => {
                    return (
                      <MenuItem value={recruiter.id}>
                        {`${recruiter.contactName}, Compañia: ${recruiter.company}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={(e) => onClickUpdate(e)}
            >
              Guardar
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );

  const DeleteFolderModal = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta a punto de eleminar esta carpeta!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione eleminar si desea hacerlo, o cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={(e) => onClickDelete(e)} color="primary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const FolderRow = (row) => (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell
            style={
              row.status === 'sent'
                ? { backgroundColor: '#cfd1d2' }
                : { backgroundColor: 'none' }
            }
            key={column.id}
            align={column.align}
          >
            {column.format && typeof value === 'number' ? (
              column.format(value)
            ) : (
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/folder/${row.uuid}`}
              >
                {value}
              </Link>
            )}
            {column.id === EDIT_FOLDER_SELECTOR_OR_RECRUITER &&
            (row.status === STATUS_CREATED || row.status === STATUS_DRAFT) ? (
              <EditIcon
                onClick={() => {
                  handleClickOpen(row.id, UPDATE_CLICK_ACTION);
                }}
              />
            ) : (
              <div> </div>
            )}
            {column.id === 'delete' && (
              <DeleteIcon onClick={() => handleClickDelete(row.id)} />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );

  return (
    <Paper>
      <h1>FOLDERS</h1>
      <br />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return FolderRow(row);
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {EditFolderModal()}
      {DeleteFolderModal()}
    </Paper>
  );
}

export default FoldersCrud;
