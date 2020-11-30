import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  list: {
    width: '17vw',
    height: 'min-content',
    marginTop: '30vh',
  },
  title: {
    textAlign: 'left',
  },
  techListItems: {
    backgroundColor: '#ebebeb',
  },
  techListScroll: {
    backgroundColor: '#ebebeb',
    overflowX: 'hidden',
    overflow: 'scroll',
    minHeight: 'min-content',
    maxHeight: 300,
  },
  softListItems: {
    backgroundColor: '#ebebeb',
  },
  softListScroll: {
    backgroundColor: '#ebebeb',
    overflowX: 'hidden',
    overflow: 'scroll',
    minHeight: 'min-content',
    maxHeight: 300,
  },
  otherListItems: {
    backgroundColor: '#ebebeb',
  },
  otherListScroll: {
    backgroundColor: '#ebebeb',
    overflowX: 'hidden',
    overflow: 'scroll',
    minHeight: 'min-content',
    maxHeight: 300,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: '0.5vw',
    fontSize: '18px',
    textTransform: 'capitalize',
  },
  icon: {
    marginRight: '0.5vw',
    cursor: 'pointer',
  },
  modal: {
    width: '20vw',
    backgroundColor: 'snow',
    margin: 'auto',
    marginTop: '30vh',
    padding: '20px',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  label: {
    margin: '0 1vw 1vh 0',
  },
  input: {
    marginBottom: '1vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    padding: '0.25vw',
    width: 'min-content',
    margin: 'auto',
    marginTop: '1vh',
  },
}));
