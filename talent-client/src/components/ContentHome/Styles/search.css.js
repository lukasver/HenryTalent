import { makeStyles } from '@material-ui/core';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'black',
    color: 'white',
  },
  searchBar: {
    '& > *': {
      margin: '0px 13px',
      width: '94%',
    },
  },
  yellowButton: {
    color: 'black',
    backgroundColor: '#ffff00',
    height: '35px',
    borderRadius: '4px',
    border: '1px solid #ffff00',
    margin: '10px',
    '&:hover': {
      backgroundColor: '#222222',
      border: '1px solid #ffff00',
      color: '#ffff00',
    },
  },
  blackButton: {
    color: 'yellow',
    backgroundColor: 'black',
    height: 35,
    borderRadius: 4,
    margin: 3,
    padding: '0px 15px',
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
  contentSearch: {
    width: '110%',
    margin: 0,
    padding: '30px 0px',
  },
  selectStyle: {
    width: '250px',
    height: '60px',
    padding: '0px 32px 0px 0px',
    '&:hover': {
      background: '#f5f5f5',
    },
    marginLeft: '34px',
  },
  inputLabel: {
    color: '#a2a2a2 !important',
    paddingLeft: 10,
    paddingBottom: 10,
    marginBottom: '25px !important',
    '&$focused': {
      background: '#ffda00',
      color: '#000000 !important',
    },
  },
  inputLabelCheck: {
    color: '#000000 !important',
    paddingLeft: 10,
    paddingBottom: 10,
    marginBottom: '25px !important',
    zIndex: 1,
    '&$focused': {
      background: '#ffda00',
      color: '#000000 !important',
    },
  },
  formControl: {
    margin: theme.spacing(1, 7, 1, 1),
    minWidth: 250,
    maxWidth: 250,
    textAlign: 'left',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  button: {
    top: 15,
    height: 50,
    width: 250,
    marginLeft: 15,
    backgroundColor: 'black',
    color: 'yellow',
    '&:hover': {
      background: '#222222',
    },
  },
  inputSelectData: {
    background: '#ffffff',
    paddingLeft: 8,
    boxShadow: '8px 7px 8px -3px rgba(0,0,0,0.35)',
  },
  formSelectFilter: {
    float: 'left',
    display: 'flex',
  },
  input: {
    marginTop: '10px',
    borderRadius: '0px',
    color: 'white',
    borderBottom: '1px solid yellow',
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
  buttonTechSkills: {
    minWidth: 250,
    maxWidth: 250,
    height: 31,
    textAlign: 'left',
    borderBottom: '1px solid #00000069 !important',
    background: '#ffffff',
    border: 'none',
    boxShadow: '8px 7px 8px -3px rgba(0,0,0,0.35)',
    margin: '25px 46px 25px 10px',
    overflow: 'hidden',
    fontSize: '1rem',
    color: 'black',
    textTransform: 'capitalize',
    fontWeight: 400,
    justifyContent: 'left',
    paddingLeft: 13,
    '&:hover': {
      background: '#000000',
      color: '#ffff00',
    },
  },
  titleModalSkills: {
    fontSize: 39,
    color: '#ffffffa3',
    fontWeight: 100,
    letterSpacing: 1,
    textAlign: 'center',
    '&:hover': {
      color: '#ffff00',
    },
  },
}));
