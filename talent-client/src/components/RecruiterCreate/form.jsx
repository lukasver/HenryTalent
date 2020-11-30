import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles.js';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme.js';
import Notification from './notification';
import { getAllFolders, getDraftFolder } from '../../redux/foldersReducer/Action';
import { getRecruiterById, getAllRecruiters } from '../../redux/recruitersReducer/Action';

export function RecruiterForm({ handleClose }) {
  const recruiterData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const draftFolder = useSelector((store) => store.FolderReducer.draftFolder);

  const recruitersData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  const initialValues = {
    contactName: activeFolder ? recruiterData && recruiterData.contactName : '',
    email: activeFolder ? recruiterData && recruiterData.email : '',
    company: activeFolder ? recruiterData && recruiterData.company : '',
    siteUrl: activeFolder ? recruiterData && recruiterData.siteUrl : '',
  };

  const dispatch = useDispatch();

  // ====== HOOKS ====== //
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const classes = useStyles();

  // ====== HANDLERS ====== //
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
    setErrors(validate({ ...values, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeFolder) {
      editRecruiter(
        values,
        setValues,
        setErrors,
        notify,
        setNotify,
        recruiterData,
        activeFolder,
        recruitersData,
        dispatch,
        getAllFolders,
        getAllRecruiters,
      );
    } else {
      createRecruiter(
        values,
        setValues,
        setErrors,
        notify,
        setNotify,
        recruiterData,
        draftFolder,
        dispatch,
        getAllFolders
      );
    }
    handleClose();
    return;
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          error={errors.contactName ? true : false}
          label="Nombre completo del contacto"
          variant="filled"
          helperText={errors.contactName ? 'Campo Requerido' : null}
          fullWidth
          id={'contactName'}
          value={values.contactName}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.email ? true : false}
          label="Email"
          variant="filled"
          helperText={errors.email ? 'Campo Requerido' : null}
          fullWidth
          id={'email'}
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.company ? true : false}
          label="Empresa"
          helperText={errors.company ? 'Campo Requerido' : null}
          variant="filled"
          fullWidth
          id={'company'}
          value={values.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.siteUrl ? true : false}
          label="Web"
          helperText={errors.siteUrl ? 'Campo Requerido' : null}
          variant="filled"
          fullWidth
          id={'siteUrl'}
          value={values.siteUrl}
          onChange={handleChange}
        />
      </div>
      <ThemeProvider theme={henryTheme}>
        <Button
          disabled={
            !errors || JSON.stringify(errors) !== JSON.stringify({})
              ? true
              : false
          }
          className={classes.submitbtn}
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
        >
          {!errors || JSON.stringify(errors) !== JSON.stringify({})
            ? 'Completar todos los campos'
            : 'Crear Recruiter'}
        </Button>
      </ThemeProvider>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
}

// ====== HELPER FUNCTIONS ====== //

const createRecruiter = (
  hook,
  setHook,
  setErrors,
  notify,
  setNotify,
  handleClose,
  draftFolder,
  dispatch,
  getAllFolders
) => {
  const initialValues = {
    contactName: '',
    email: '',
    company: '',
    siteUrl: '',
  };
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/recruiters`, hook)
    .then((response) => {
      setHook(initialValues);
      setErrors(true);
      setNotify({
        isOpen: true,
        message: 'Recruiter creado con éxito',
        type: 'success',
      });
      return response.data;
    })
    .then((response) => {
      axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/folders/${draftFolder.id}?recruiterId=${response.id}`
      );
      return;
    })
    .then(() => {
      let body = {
        status: 'created'
      }
      axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/folders/status/${draftFolder.id}`, body
      );
      return;
    })
    .then(() => {
      dispatch(getAllFolders());
      dispatch(getDraftFolder());
      dispatch(getAllRecruiters());
    })
    .catch((error) => {
      setNotify({
        isOpen: true,
        message: 'Oops... ocurrió un error.',
        type: 'error',
      });
      return;
    });
};

const editRecruiter = (
  hook,
  setHook,
  setErrors,
  notify,
  setNotify,
  handleClose,
  activeFolder,
  recruitersData,
  dispatch,
  getAllRecruiters
) => {
  const initialValues = {
    contactName: '',
    email: '',
    company: '',
    siteUrl: '',
  };
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_URL}/recruiters/${recruitersData.id}`,
      hook
    )
    .then((response) => {
      setHook(initialValues);
      setErrors(true);
      setNotify({
        isOpen: true,
        message: 'Recruiter creado con éxito',
        type: 'success',
      });
      return response.data;
    })
    .then(() => {
      dispatch(getAllFolders());
      dispatch(getAllRecruiters());
      dispatch(getRecruiterById(activeFolder.recruiterId));
    })
    .catch((error) => {
      setNotify({
        isOpen: true,
        message: 'Oops... ocurrió un error.',
        type: 'error',
      });
      return;
    });
};

const validate = (input) => {
  let errors = {};
  if (!input.contactName) {
    errors.contactName = 'Este campo es requerido';
  }
  if (!input.company) {
    errors.company = 'Este campo es requerido';
  }
  if (!input.siteUrl) {
    errors.siteUrl = 'Este campo es requerido';
  }
  if (!input.email) {
    errors.email = 'Este campo es requerido';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = 'Ingresar un formato de e-mail válido';
  }
  return errors;
};
