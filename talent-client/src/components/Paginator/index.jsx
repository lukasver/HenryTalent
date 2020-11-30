import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import { henryTheme } from '../../henryMuiTheme';

const defaultPagesToShow = 10;

function Paginator(props) {
  const classes = useStyles();

  const handlePageChange = (event, value, currentPage) => {
    if (value === currentPage) return;
    props.setCurrentPage(value);
    props.setPager(!props.newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <ThemeProvider theme={henryTheme}>
        <Pagination
          color="primary"
          count={props.maxPages} // total pages
          page={props.current} // current page
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            handlePageChange(e, value, props.current);
          }}
        />
      </ThemeProvider>
    </Grid>
  );
}

Paginator.propTypes = {
  pages: PropTypes.number,
};

Paginator.defaultProps = {
  pages: defaultPagesToShow,
};

export default Paginator;
