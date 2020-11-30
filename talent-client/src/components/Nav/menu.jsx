import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';

const useStyle = makeStyles({
  ulList: {
    color: '#ffffff',
    display: 'inline-flex',
    alignItems: 'center',
  },
  liList: {
    listStyle: 'none',
    padding: '0px 25px',
    fontSize: '18px',
  },
  selectedLink: {
    color: '#FFFFFF',
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    '&:hover': {
      color: '#FFF001',
    },
  },
});

function Menu() {
  const classes = useStyle();

  return (
    <Grid container item xs={12} spacing={3}>
      <ThemeProvider theme={henryTheme}>
        <ul className={classes.ulList}>
          {/* <NavLink to="/" className={classes.link}>
            <li className={classes.liList}>Home</li>
          </NavLink>
          <NavLink to="/" className={classes.link}>
            <li className={classes.liList}>Candidates</li>
          </NavLink>
          <NavLink to="/skills" className={classes.link}>
            <li className={classes.liList}>Skills</li>
          </NavLink>
          <NavLink to="/recruiters/add" className={classes.link}>
            <li className={classes.liList}>Recruiters</li>
          </NavLink>
          <NavLink to="/contact" className={classes.link}>
            <li className={classes.liList}>Contact</li>
          </NavLink> */}
        </ul>
      </ThemeProvider>
    </Grid>
  );
}

export default Menu;
