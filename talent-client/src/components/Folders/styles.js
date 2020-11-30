import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  candidatesContent: {
    background: 'white',
    height: 'calc(100vh - 0px)',
    float: 'left',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  formCandidates: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    maxHeight: 720,
    paddingTop: '2rem',
  },
  ulEditCondidate: {
    listStyle: 'none',
    margin: 0,
  },
  liEditCondidate: {
    float: 'left',
    paddingRight: 6,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '70px 175px 48px',
  },
  miniBio: {
    width: 705,
  },
  button: {
    margin: theme.spacing(1),
    width: '-webkit-fill-available',
    padding: 15,
    backgroundColor: '#282f3c',
    color: '#ffff00',
    '&:hover': {
      backgroundColor: '#ffff00',
      color: '#000000',
    },
  },
  avatar: {
    width: 130,
    height: 130,
  },
  titleCandidates: {
    margin: '0px -175px',
    backgroundColor: '#282f3c',
    padding: '15px 0px',
    position: 'absolute',
    marginTop: '-70px',
    textAlign: 'center',
    width: 728,
    color: 'yellow',
    fontFamily: 'Roboto',
    fontWeight: 100,
    fontSize: 40,
  },
  background: {
    backgroundColor: 'white',
  },
  paddingCandidate: {
    paddingTop: 10,
  },
  CandidateCard: {
    margin: 25,
    borderRadious: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
