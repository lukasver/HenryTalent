import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStyles } from './styles.js';
import { Container, Grid, Typography, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';
import { getDossierByUuid } from '../../redux/foldersReducer/Action.js';
import NotFound from '../../images/404notfound.jpg';

function RecruiterFolder() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [folder, setFolder] = useState([]);
  const [error, setError] = useState(`<h1>Loading...</h1>`);
  const [recruiter, setRecruiter] = useState([]);
  const cardsMaxLimit = 10;

  useEffect(() => {
    dispatch(getDossierByUuid(uuid)); // por si sirve a futuro...
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/folders/dossier/${uuid}`)
      .then((response) => {
        setRecruiter(response.data.recruiter);
        setFolder(response.data.candidates);
        return;
      })
      .catch((error) => {
        setError(wrongPathError());
      });
  }, [uuid]);

  if (!folder.length) return error;
  return (
    <Container className={classes.container} maxWidth="xl">
      <ThemeProvider theme={henryTheme}>
        <Typography color="primary" gutterBottom variant="h5" component="h2">
          Candidatos Seleccionados{' '}
          {recruiter && Object.keys(recruiter).length
            ? ` para: ${recruiter.contactName} - ${recruiter.company}`
            : `:`}
        </Typography>
        <Grid
          className={classes.paddingCandidates}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {folder.length &&
            folder.map(
              (candidate, index) =>
                index < cardsMaxLimit && (
                  // candidate.visibility == 'listed' &&
                  <div key={index} className={classes.CandidateCard}>
                    <CandidateCard uuid={uuid} candidate={candidate} />
                  </div>
                )
            )}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

const wrongPathError = () => {
  return (
    <ThemeProvider theme={henryTheme}>
      <img src={NotFound} alt="Sorry not found" height="auto" width="auto" />
      <Typography color="primary" gutterBottom variant="body2">
        La página que estas buscando no existe o ha ocurrido un error.
      </Typography>
      <Typography
        color="primary"
        gutterBottom
        variant="body2"
        style={{ paddingBottom: 50 }}
      >
        <Link href="/">Vuelve atrás</Link> o ponte en contacto con nuestro
        staff.
      </Typography>
    </ThemeProvider>
  );
};

export default RecruiterFolder;
