import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  candidatesContent: {
    background: 'white',
    height: 'calc(101vh - 0px)',
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
    maxHeight: 600,
  },
  ulEditCandidate: {
    listStyle: 'none',
    margin: 0,
  },
  liEditCandidate: {
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
    padding: '70px 56px 48px',
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
    margin: '0px -55px',
    backgroundColor: '#282f3c',
    padding: '46px 52px',
    position: 'absolute',
    marginTop: '-70px',
    textAlign: 'center',
    width: 728,
    color: 'yellow',
    fontFamily: 'Roboto',
    fontWeight: 100,
    fontSize: 40,
  },
  titleCsvCandidates: {
    margin: '0px -56px',
    backgroundColor: '#282f3c',
    padding: '28px 52px',
    position: 'absolute',
    marginTop: '-70px',
    textAlign: 'center',
    width: 1162,
    color: 'yellow',
    fontFamily: 'Roboto',
    fontWeight: 100,
    fontSize: 40,
  },
  selectItems: {
    float: 'left',
  },
  selectOptions: {
    minWidth: 196,
    maxWidth: 215,
  },
  selectOptionsStatus: {
    minWidth: 50,
    maxWidth: 215,
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 50,
    margin: '50px 5px 30px 0',
  },
  filter: {
    display: 'flex',
    width: '42vw',
    justifyContent: 'space-around',
    height: '40px',
    backgroundColor: ' #f0f0f0',
    padding: '9px 20px',
    borderRadius: 6,
    marginBottom: 30,
    marginLeft: 14,
  },
  text: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 900,
    margin: 0,
    padding: 0,
  },
  search: {
    padding: '5px',
  },
  inputSearch: {
    width: 246,
  },
  csvToJson: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 29,
    margin: '0px 10px 25px 0',
    background: '#f0f0f0',
    padding: '14px 20px',
    width: 430,
    borderRadius: 8,
    float: 'right',
  },
  titleCsv: {
    margin: ' 4px 13px',
  },
  addCandidates: {
    maxWidth: 200,
    padding: '10px 20px',
    backgroundColor: '#282f3c',
    color: 'yellow',
    margin: 10,
    '&:hover': {
      backgroundColor: 'yellow',
      color: '#282f3c',
    },
  },
  containerButtonCsv: {
    display: 'flex',
    justifyContent: 'center',
  },
  tableHeadBlack: {
    backgroundColor: '#171c24',
    color: 'white',
  },
}));
