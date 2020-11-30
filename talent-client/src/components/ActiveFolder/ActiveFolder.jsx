import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './styles';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Swal from 'sweetalert2';
import {
  getFoldersByCompany,
  getRecruiterById,
  getAllRecruiters,
} from '../../redux/recruitersReducer/Action';
import {
  setActiveFolder,
  deleteActiveFolder,
  getAllFolders,
} from '../../redux/foldersReducer/Action';
import { Button } from '@material-ui/core';
import CreateRecruiterModal from '../RecruiterCreate/Modal';
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ActiveFolder() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const recruitersData = useSelector(
    (store) => store.RecruitersReducer.allRecruiters
  );

  const recruiterData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  const foldersFromRecruiterData = useSelector(
    (store) => store.RecruitersReducer.foldersFromRecruiter
  );

  const allFolders = useSelector((store) => store.FolderReducer.allFolders);

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const draftFolder = useSelector((store) => store.FolderReducer.draftFolder);

  const [company, setCompany] = useState([]);
  const [folder, setFolder] = useState([]);
  const [foldersFromRecruiter, setFoldersFromRecruiter] = useState([]);
  const [openCompany, setOpenCompany] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [path, setPath] = useState(null);
  const recruiters = ["Draft"].concat(recruitersData.map(recruiter => recruiter.company))

  useEffect(() => {
    dispatch(getAllRecruiters())
  }, [recruiterData])

  const DATE_FORMAT = 'YYYY/MM/DD - HH:mm:ss';

  const handleCloseCompany = () => {
    setOpenCompany(false);
  };

  const handleOpenCompany = () => {
    setOpenCompany(true);
  };

  const handleCloseFolder = () => {
    setOpenFolder(false);
  };

  const handleOpenFolder = () => {
    if (foldersFromRecruiter === 'undefined') {
      setFoldersFromRecruiter([]);
      dispatch(getRecruiterById());
    } else {
      setFoldersFromRecruiter(foldersFromRecruiterData);
    }
    setOpenFolder(true);
  };

  const handleChangeCompany = (event) => {
    if (event.target.value === 'Draft') {
      setFoldersFromRecruiter('undefined');
      dispatch(deleteActiveFolder());
    }
    setCompany(event.target.value);
    dispatch(getFoldersByCompany(event.target.value));
  };

  const handleChangeFolder = (event) => {
    setFolder(event.target.value);
    dispatch(getRecruiterById(event.target.value.recruiterId));
    dispatch(setActiveFolder(event.target.value));
  };

  const RedirectToFolderPreview = () => {
    if (activeFolder !== null) return setPath(`/preview/${activeFolder.id}`);
    else return setPath(`/preview/${draftFolder.id}`);
  };

  if (path) {
    return <Redirect to={path} />;
  }

  const handleSendEmail = () => {
    Swal.fire({
      title: `Estas a punto de enviar esta carpeta a ${recruiterData.email}`,
      text: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${BACKEND_URL}/folders/send`, {
          email: recruiterData.email,
          uuid: activeFolder.uuid,
        });
        Swal.fire({
          icon: 'success',
          text: 'Email enviado',
        });
        dispatch(getAllFolders());
      }
    });
  };

  return (
    <div>
      <Button
        className={classes.folderPreview}
        onClick={RedirectToFolderPreview}
      >
        Folder Preview
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Company</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openCompany}
          onClose={handleCloseCompany}
          onOpen={handleOpenCompany}
          value={company || ''}
          onChange={handleChangeCompany}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          {recruiters.map((element, index) => (
            <MenuItem key={index} value={element}>
              <ListItemText primary={element} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Folders</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openFolder}
          onClose={handleCloseFolder}
          onOpen={handleOpenFolder}
          value={folder || ''}
          onChange={handleChangeFolder}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          {foldersFromRecruiter && foldersFromRecruiter.id
            ? foldersFromRecruiter.folders.map((element, index) => (
                <MenuItem key={index} value={element}>
                  <ListItemText
                    primary={moment(element.createdAt).format(DATE_FORMAT)}
                  />
                </MenuItem>
              ))
            : allFolders &&
              allFolders.map((element, index) => (
                <MenuItem key={index} value={element}>
                  <ListItemText
                    primary={moment(element.createdAt).format(DATE_FORMAT)}
                  />
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <Button>
        <CreateRecruiterModal />
      </Button>
      {activeFolder && (
        <Button className={classes.folderPreview} onClick={handleSendEmail}>
          Send folder
        </Button>
      )}
    </div>
  );
}
