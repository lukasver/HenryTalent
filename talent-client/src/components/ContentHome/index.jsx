import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Search from './search.jsx';
import { useStyle } from './Styles/index.css.js';

function ContentHome() {
  const classes = useStyle();

  return (
    <div className={classes.contentSearchFluid}>
      <Container className={classes.contentSearch} maxWidth="lg">
        <Grid container item xs={12} sm={12} spacing={3}>
          <Search />
        </Grid>
      </Container>
    </div>
  );
}

export default ContentHome;
