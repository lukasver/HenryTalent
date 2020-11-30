import { makeStyles } from '@material-ui/core';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

export const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'black',
    color: 'white',
  },
  searchBar: {
    '& > *': {
      margin: theme.spacing(0),
      width: '25ch',
    },
  },
  yellowButton: {
    color: 'black',
    backgroundColor: 'yellow',
    height: '35px',
    borderRadius: '4px',
    border: 'none',
    margin: '10px',
  },
  blackButton: {
    color: 'yellow',
    backgroundColor: 'black',
    height: '35px',
    borderRadius: '4px',
    margin: '10px',
    border: '1px yellow solid',
    '&:focus': {
      border: '1px yellow solid',
    },
  },
  checkIcon: {
    marginLeft: '10px',
    width: '15px !important',
  },
  divAllSkills: {
    marginTop: '20px',
  },
  generalDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '40px',
  },
  inputLabel: {
    marginBottom: '25px !important',
  },
  input: {
    marginTop: '10px',
    borderRadius: '30px',
    color: 'white',
  },
  skillSelected: {
    position: 'relative',
    bottom: '5px',
  },
  divBlackButton: {
    margin: '10px',
    float: 'left',
  },
  divSelectedSkills: {
    float: 'left',
  },
  marginTop: {
    marginTop: '20px',
  },
}));
