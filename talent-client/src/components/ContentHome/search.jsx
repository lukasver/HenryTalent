import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { useStyle, getModalStyle } from './Styles/search.css';
import {
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  InputLabel,
  FormControl,
  Select,
  Button,
  Modal,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import { getAllSkills } from '../../redux/skillsReducer/Action';
import { getFilterCandidates } from '../../redux/candidatesReducer/Action';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Search() {
  const history = useHistory();
  const candidates = useSelector(
    (store) => store.CandidateReducer.allListedCandidates
  );
  const allSkills = useSelector((store) => store.SkillsReducer.allSkills);
  const dispatch = useDispatch();
  const classes = useStyle();
  const [statusFilter, setStatusFilter] = useState({
    skills: [],
    cohortId: [],
    locations: [],
  });
  const [allSkillsData, setAllSkillsData] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const techSkills = allSkills.filter((dataSkill) => dataSkill.type === 'tech');

  const locations = Array.from(
    new Set(candidates.map((dataCandidate) => dataCandidate.country))
  );
  const cohorts = Array.from(
    new Set(
      candidates.map((dataCohort) => ({
        name: dataCohort.cohort.name,
        id: dataCohort.cohortId,
      }))
    )
  );

  useEffect(() => {
    if (!allSkills.length) {
      dispatch(getAllSkills());
    }
  }, [candidates, allSkills, dispatch]);

  const handleChange = (e, statusName) => {
    setStatusFilter({
      ...statusFilter,
      [statusName]: e.target.value,
    });
  };

  const handleRemoveFilters = (e) => {
    e.preventDefault();
    setStatusFilter({
      skills: [],
      cohortId: [],
      locations: [],
    });
    dispatch(getFilterCandidates([]));
    window.location.reload(); // TODO: Cambiar por otra cosa que no rompa el paginado. para la demo sirve
    return;
  };

  const onClickFilter = (e) => {
    e.preventDefault();
    dispatch(getFilterCandidates(statusFilter));
    handleClose();
  };

  const handleOpen = () => {
    !allSkillsData.length &&
      setAllSkillsData(
        ...allSkillsData,
        techSkills.map((dataSkills) => dataSkills.name)
      );
    setOpen(true);
  };

  const handleClose = () => {
    setStatusFilter({
      ...statusFilter,
      skills: skillsSelected,
    });
    setOpen(false);
  };

  const handleSearchSkill = (e) => {
    setFilteredSkills(
      allSkillsData.filter(
        (skill) =>
          skill.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      )
    );
  };

  const addSkill = (e) => {
    if (!skillsSelected.some((skill) => skill === e.target.value)) {
      setSkillsSelected((oldSkills) => [...oldSkills, e.target.value]);
      setAllSkillsData(
        allSkillsData.filter((skill) => skill !== e.target.value)
      );
      setFilteredSkills(
        filteredSkills.filter((skill) => skill !== e.target.value)
      );
    }
  };

  const removeSkill = (e) => {
    setSkillsSelected(
      skillsSelected.filter((skill) => skill !== e.target.value)
    );
    if (e.target.value) {
      setAllSkillsData((oldSkills) => [e.target.value, ...oldSkills]);
    }
  };

  const modalSkills = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.titleModalSkills}>
        Select Skills Technologies
      </h2>
      <FormControl className={classes.searchBar}>
        <InputLabel className={classes.inputLabel} htmlFor="my-input">
          Search skill...
        </InputLabel>
        <Input
          className={classes.input}
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleSearchSkill}
        />
      </FormControl>
      <div className={classes.generalDiv}>
        <div className={classes.marginTop}>
          {skillsSelected &&
            skillsSelected.map((skill, index) => (
              <div key={index} className={classes.divSelectedSkills}>
                <button
                  className={classes.yellowButton}
                  onClick={removeSkill}
                  value={skill}
                >
                  <span className={classes.skillSelected}>{skill}</span>
                  <CheckIcon className={classes.checkIcon} />
                </button>
              </div>
            ))}
        </div>
        <div className={classes.divAllSkills}>
          {filteredSkills.length > 0
            ? filteredSkills.map((skill, index) => (
                <div key={index} className={classes.divBlackButton}>
                  <button
                    className={classes.blackButton}
                    onClick={addSkill}
                    value={skill}
                  >
                    {skill}
                  </button>
                </div>
              ))
            : allSkillsData.map((skill, index) => (
                <div key={index} className={classes.divBlackButton}>
                  <button
                    className={classes.blackButton}
                    onClick={addSkill}
                    value={skill}
                  >
                    {skill}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.yellowButton}
        startIcon={<SearchIcon />}
        onClick={onClickFilter}
      >
        Search
      </Button>
    </div>
  );

  const selectForms = (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-locations" className={classes.inputLabelCheck}>
          Locations
        </InputLabel>
        <Select
          labelId="select-label-locations"
          id="select-id-locations"
          className={classes.inputSelectData}
          multiple
          value={statusFilter.locations}
          onChange={(e) => handleChange(e, 'locations')}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {locations.length &&
            locations.sort().map((location) => (
              <MenuItem key={location} value={location}>
                <Checkbox
                  checked={statusFilter.locations.indexOf(location) > -1}
                />
                <ListItemText primary={location} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-cohorts" className={classes.inputLabelCheck}>
          Cohort
        </InputLabel>
        <Select
          labelId="select-label-cohorts"
          id="select-id-cohort"
          className={classes.inputSelectData}
          multiple
          value={statusFilter.cohortId}
          onChange={(e) => handleChange(e, 'cohortId')}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cohorts.length &&
            cohorts
              .sort((a, b) => a.id - b.id)
              .map((cohort) => (
                <MenuItem key={cohort.id} value={cohort.id}>
                  <Checkbox
                    checked={statusFilter.cohortId.indexOf(cohort.id) > -1}
                  />
                  <ListItemText primary={cohort.name} />
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );

  const formSelectFilter = () => (
    <div className={classes.formSelectFilter}>
      {selectForms}
      <div>
        <Button
          type="button"
          className={classes.buttonTechSkills}
          onClick={handleOpen}
          startIcon={<OfflinePinIcon />}
        >
          {!skillsSelected.length
            ? 'Select Technologies'
            : skillsSelected.join()}
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalSkills}
      </Modal>
    </div>
  );

  return (
    <div>
      {formSelectFilter()}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        style={{ maxWidth: 200 }}
        startIcon={<SearchIcon />}
        onClick={onClickFilter}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        style={{ maxWidth: 40 }}
        onClick={handleRemoveFilters}
      >
        Clear
      </Button>
    </div>
  );
}

export default Search;
