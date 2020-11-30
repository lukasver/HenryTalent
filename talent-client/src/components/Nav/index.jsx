import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import { Grid, Container, makeStyles, IconButton } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import AcountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Menu from './menu.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { newFolder } from '../../redux/foldersReducer/Action.js';
import { Redirect } from 'react-router-dom';

const useStyle = makeStyles({
  logo: {
    padding: '50px 0px',
  },
  icons: {
    color: '#ffff00',
    maxWidth: '120px',
  },
  containerIcons: {
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
    color: '#ffff00',
  },
});

function Nav({ location }) {
  const classes = useStyle();

  return (
    <nav>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid container item xs={3} sm={3} spacing={3}>
            <Link to="/">
              <img className={classes.logo} alt="Henry Logo" src={logo} />
            </Link>
          </Grid>
          {location !== '/dossier/' && (
            <Grid container item xs={9}>
              <Grid container item xs={9} sm={9} spacing={3}>
                <Menu />
              </Grid>
              <Grid
                className={classes.containerIcons}
                container
                item
                xs={3}
                sm={3}
                spacing={1}
              >
                <IconButton
                  className={classes.icons}
                  label="Acount Circle"
                  value="folder"
                >
                  <AcountCircle />
                </IconButton>
                {/* <IconButton
                  className={classes.icons}
                  label="Folder"
                  value="folder"
                  onClick={HandleRedirectToFolders}
                >
                  <FolderIcon />
                </IconButton> */}
                <IconButton
                  className={classes.icons}
                  label="Setting"
                  value="folder"
                  style={{ marginTop: 5 }}
                >
                  <Link to="/panel" className={classes.link}>
                    <Settings />
                  </Link>
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </nav>
  );
}

export default Nav;
