import { makeStyles, useTheme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  folderPreview: {
    position: 'relative',
    top: '12px',
    marginRight: '20px',
    backgroundColor: 'yellow',
    '&:hover': {
      backgroundColor: 'yellow',
    },
  },
}));
