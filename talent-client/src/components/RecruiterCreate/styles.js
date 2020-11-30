import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      maxWidth: 600,
      marginBottom: 20,
    },
    '& .MuiInputBase-input': {
      color: '#FFFFFF',
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(2),
    },
    '& .Mui-disabled': {
      backgroundColor: '#FFF001',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#0e0e0e',
      '&:hover': {},
    },
  },
  submitbtn: {
    maxWidth: 600,
    marginBottom: theme.spacing(3),
    '&:hover': {
      color: '#111111',
      backgroundColor: '#FFF001',
    },
  },
}));
