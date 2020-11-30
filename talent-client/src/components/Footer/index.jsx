import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  copyright: {
    color: 'white',
    padding: '28px',
  },
  containerFooter: {
    justifyContent: 'center',
  },
  containerFooterMain: {
    borderTop: '1px solid #ffff0017;',
  },
});

function Footer() {
  const classes = useStyle();

  return (
    <nav className={classes.containerFooterMain}>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid
            className={classes.containerFooter}
            container
            item
            xs={12}
            sm={12}
            spacing={3}
          >
            <p className={classes.copyright}>
              Todos los derechos reservados a Henry Talent
            </p>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
}

export default Footer;
