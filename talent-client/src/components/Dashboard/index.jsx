import React from 'react';
import Menu from './menu';
import Candidates from './candidates';
import Skills from './skills';
import FoldersCrud from '../Folders/index';
import { useStyle } from './Styles/index.css.js';
import { Grid } from '@material-ui/core';

function Dashboard({ componentToRender }) {
  const classes = useStyle();

  return (
    <div className={classes.dashboardMain}>
      <Grid container item xs={2} sm={2} spacing={1} className={classes.menu}>
        <Menu />
      </Grid>
      <Grid
        container
        item
        xs={10}
        sm={10}
        spacing={1}
        className={classes.containerRight}
      >
        {componentToRender === 'candidates' && <Candidates />}
        {componentToRender === 'skills' && <Skills />}
        {componentToRender === 'folders' && <FoldersCrud />}
      </Grid>
    </div>
  );
}

export default Dashboard;
