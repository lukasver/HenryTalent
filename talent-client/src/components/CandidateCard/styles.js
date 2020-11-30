import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { yellow, grey } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 600,
    maxHeigth: 364,
    minHeight: 364,
    borderStyle: 'solid',
    borderColor: '#111',
    border: 2,
    boxShadow: '1px 2px 8px 1px #000000',
    '&:hover': {
      boxShadow: '2px 2px 24px -2px #fff',
      borderColor: '#87868A',
    },
  },
  miniBioBody: {
    marginTop: '10px',
    marginBottom: 10,
    minHeight: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 6,
    '-webkit-box-orient': 'vertical',
    width: 368,
  },
  skillsContainer: {
    minHeight: 60,
  },
  scoring: {
    position: 'relative',
    left: 0,
    top: 0,
    fontWeight: 900,
    backgroundColor: '#FFF001',
  },
  skillsText: {
    fontWeight: 900,
    fontSize: 12,
  },
  tooltip: {
    position: 'absolute',
    right: '5px',
    bottom: '5px',
  },
  media: {
    minHeight: 364,
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  techSkills: {
    borderRadius: 50,
    maxHeight: 16,
    // marginTop: 10,
    // marginRight: 20,
    fontSize: 14,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: grey[300],
    },
  },
  softSkills: {
    borderRadius: 50,
    maxHeight: 16,
    // marginTop: 20,
    // marginRight: 20,
    fontSize: 14,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#fff001',
    },
    // paddingBottom: '7px !important',
  },
  contactButton: {
    maxHeight: 20,
    marginBottom: -20,
    border: 1,
    borderStyle: 'solid',
  },
  contactButtonView: {
    display: 'none',
  },
  nameHeader: {
    minHeight: 50,
    maxHeight: 50,
  },
}));

export const PersonalizedTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    marginRight: '8px',
    color: '#FFFFFF',
    boxShadow: theme.shadows[1],
    border: '1px solid #87868A',
    fontSize: 16,
    minWidth: 360,
    maxWidth: 360,
    textAlign: 'center',
  },
}))(Tooltip);

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow['A200'],
    },
    secondary: {
      main: '#000',
    },
  },
});
