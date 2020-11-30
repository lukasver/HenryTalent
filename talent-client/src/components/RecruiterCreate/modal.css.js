import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'black',
  },
  addRecruiter: {
    position: 'relative',
    top: '12px',
    marginLeft: '20px',
    backgroundColor: 'yellow',
    '&:hover': {
      backgroundColor: 'yellow',
    },
  },
  centerModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
