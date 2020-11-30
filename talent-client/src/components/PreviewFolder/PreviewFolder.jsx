import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles.js';
import { Container, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';

function PreviewFolderActive() {
  const { id } = useParams();
  const classes = useStyles();
  const cardsMaxLimit = 10;

  const draftFolder = useSelector((store) => store.FolderReducer.draftFolder);

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const recruiterData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  return (
    <Container className={classes.container} maxWidth="xl">
      <ThemeProvider theme={henryTheme}>
        <Typography
          color="primary"
          style={{ color: 'yellow' }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Candidatos Seleccionados{' '}
          {activeFolder && recruiterData && Object.keys(recruiterData).length
            ? ` para: ${recruiterData.contactName} - ${recruiterData.company}`
            : `: Draft Folder`}
        </Typography>
        <Grid
          className={classes.paddingCandidates}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {activeFolder
            ? activeFolder.candidates.map(
                (candidate, index) =>
                  index < cardsMaxLimit && (
                    <div key={index} className={classes.CandidateCard}>
                      <CandidateCard id={id} candidate={candidate} />
                    </div>
                  )
              )
            : draftFolder &&
              draftFolder.candidates &&
              draftFolder.candidates.map(
                (candidate, index) =>
                  index < cardsMaxLimit && (
                    <div key={index} className={classes.CandidateCard}>
                      <CandidateCard id={id} candidate={candidate} />
                    </div>
                  )
              )}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default PreviewFolderActive;
