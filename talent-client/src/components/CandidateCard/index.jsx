import React from 'react';
import PropTypes from 'prop-types';
import { useStyles, theme, PersonalizedTooltip } from './styles.js';

// MUI Components
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IconButton, Box } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import Chip from '@material-ui/core/Chip';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/Email';
import imgtest from '../../images/cvtest.png';
import Zoom from '@material-ui/core/Zoom';
import GradeIcon from '@material-ui/icons/Grade';

function CandidateCard(props) {
  const {
    includes,
    candidate,
    uuid,
    folder,
    handleCandidate,
    location,
    dispatch,
  } = props;
  const tech =
    candidate.skills &&
    candidate.skills.filter((skill) => skill.type === 'tech');
  let soft =
    candidate.skills &&
    candidate.skills.filter((skill) =>
      skill.type === 'soft' ? skill.type : null
    );

  const labelsMaxLimit = 10;

  const classes = useStyles();
  // HANDLERS //
  const handleContactCandidate = () => {
    //TODO: add function to send :mailto
  };
  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4} display={{ position: 'relative' }}>
          {/*Profile Picture*/}
          <CardMedia
            className={classes.media}
            image={candidate.profilePicture || imgtest} // add "candidate.profilePicture" when seed works again
            title="Henry Candidate"
          />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          style={{ position: 'relative' }}
        >
          <ThemeProvider theme={theme}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ marginTop: 5 }}
            >
              <Grid item xs={8} className={classes.nameHeader}>
                {/*FullName*/}
                <Typography
                  align="center"
                  variant="h5"
                  component="h2"
                  style={{ marginTop: 7 }}
                >
                  {`${candidate.firstName} ${candidate.lastName}`}
                </Typography>
                {/*Top-right Icons*/}
              </Grid>
              <Grid item xs={2}>
                <Link
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                  href={candidate.github}
                >
                  <GitHubIcon
                    name="GitHub"
                    style={{ fontSize: 20, marginBottom: 3, marginLeft: 20 }}
                  />
                </Link>
                <Link
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                  href={candidate.linkedin}
                >
                  <LinkedInIcon name="LinkedIn" />
                </Link>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  style={{ marginLeft: 20 }}
                  color="secondary"
                  edge="start"
                  onClick={(event) => {
                    handleCandidate
                      ? handleCandidate(
                          event,
                          candidate.id,
                          folder,
                          uuid,
                          includes,
                          candidate,
                          dispatch
                        )
                      : handleContactCandidate(event);
                  }}
                >
                  {!uuid ? (
                    includes ? (
                      <Badge badgeContent="✔" color="primary">
                        <FolderIcon />
                      </Badge>
                    ) : (
                      <CreateNewFolderIcon />
                    )
                  ) : (
                    <EmailIcon />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </ThemeProvider>
          <CardContent style={{ paddingTop: 0, flexGrow: 1 }}>
            {/*Location && Cohort*/}
            <Typography
              align="left"
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ paddingLeft: 15 }}
            >
              {`${candidate.country}  -  ${candidate.cohort.name}`}
            </Typography>
            <Divider variant="middle" style={{ marginBottom: '8px' }} />
            <ThemeProvider theme={theme}>
              {/* Label mapping with TechSkills */}
              <Grid
                container
                justify="space-evenly"
                alignItems="center"
                spacing={1}
                className={classes.skillsContainer}
              >
                {/*skills.hard && skills.hard.map*/}
                {/* Arreglar esto cuando este listo el endpoint con skills..*/}
                {tech && tech.length
                  ? tech.map(
                      (objSkill, index) =>
                        index < labelsMaxLimit && (
                          <Chip
                            key={index}
                            className={classes.techSkills}
                            size="small"
                            color="primary"
                            label={
                              objSkill.name.length > 3
                                ? objSkill.name.charAt(0).toUpperCase() +
                                  objSkill.name.slice(1)
                                : objSkill.name.toUpperCase()
                            }
                          />
                        )
                    )
                  : null}
              </Grid>
              {soft && soft.length ? (
                <Divider
                  style={{ marginTop: '8px', marginBottom: '8px' }}
                  variant="fullWidth"
                />
              ) : null}
              {soft && soft.length ? (
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={1}
                  className={classes.skillsContainer}
                >
                  {soft &&
                    soft.map(
                      (objSkill, index) =>
                        index < labelsMaxLimit && (
                          <Chip
                            key={index}
                            className={classes.softSkills}
                            size="small"
                            label={
                              objSkill.name.length > 3
                                ? objSkill.name.charAt(0).toUpperCase() +
                                  objSkill.name.slice(1)
                                : objSkill.name.toUpperCase()
                            }
                          />
                        )
                    )}
                </Grid>
              ) : null}
              <Divider
                style={{ marginTop: '8px', marginBottom: '8px' }}
                variant="fullWidth"
              />
              {/* Mini-Bio */}
              <Typography
                className={classes.miniBioBody}
                variant="body1"
                color="textPrimary"
                component="p"
                align="justify"
              >
                {longText || candidate.miniBio}
              </Typography>
            </ThemeProvider>
          </CardContent>
          <Box className={classes.tooltip} component="span" display="flex">
            {location === '/' && (
              <ThemeProvider theme={theme}>
                <PersonalizedTooltip
                  TransitionComponent={Zoom}
                  disableHoverListener={candidate.comment ? false : true}
                  title={candidate.comment ? candidate.comment : false}
                  placement="top-end"
                >
                  <Badge
                    color="secondary"
                    badgeContent={candidate.comment ? 1 : 0}
                    variant="dot"
                  >
                    <Chip
                      className={classes.scoring}
                      size="small"
                      label={candidate.score || '-'}
                      icon={<GradeIcon />}
                    />
                  </Badge>
                </PersonalizedTooltip>
              </ThemeProvider>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

CandidateCard.propTypes = {
  candidate: PropTypes.exact({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
    skills: PropTypes.array,
    cohort: PropTypes.object,
    profilePicture: PropTypes.string,
    miniBio: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
    visibility: PropTypes.string,
    status: PropTypes.string,
    score: PropTypes.number,
    comment: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    cohortId: PropTypes.number,
  }),
  folder: PropTypes.object,
  includes: PropTypes.bool,
  uuid: PropTypes.string,
};

// Mock candidate for props received in CandidateCard
CandidateCard.defaultProps = {
  candidate: {
    firstName: 'Daniel',
    lastName: 'Stadler',
    location: 'Sarasota, TX, USA',
    skills: {
      hard: [
        'JavaScript',
        'React',
        'Redux',
        'HTML',
        'CSS',
        'SQL',
        'Node',
        'PHP',
      ],
      soft: ['Leader', 'Partnership', 'Fast Learner', 'English', 'Portuguese'],
    },
    profilePicture: null,
    score: 4,
    comment: 'Muy buenas habilidades para el trabajo en equipo',
    miniBio: `
    I'm a software engineer who believes that out-of-the-box thinking is what
     separates a great project from a good one. I do most of mine in Javascript, 
     React, Node.js and Python.`,
    linkedin: '/',
    github: 'https://github.com/henry-labs/talent',
  },
  folder: {
    id: 1,
    mock: true,
    recruiter: {
      contactName: 'Tim Cook',
      email: 'Cookingwithtim@apple.com',
      company: 'Apple Inc.',
    },
    candidates: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 6,
      },
    ],
  },
};

export default CandidateCard;
