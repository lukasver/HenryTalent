import React, { useState, useEffect } from 'react';
import { getModalStyle, useStyles } from './styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';

const TechSkillsFilter = () => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [allSkills, setAllSkills] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [open, setOpen] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getAllSkills = async (techSkills) => {
      const skills = await axios.get(`${BACKEND_URL}/skills/`);
      techSkills = skills.data.filter((skill) => skill.type === 'tech');
      setAllSkills(techSkills.map((skill) => skill.name));
    };
    getAllSkills();
  }, [BACKEND_URL]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchSkill = (e) => {
    setFilteredSkills(
      allSkills.filter(
        (skill) =>
          skill.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      )
    );
  };

  const addSkill = (e) => {
    if (!skillsSelected.some((skill) => skill === e.target.value)) {
      setSkillsSelected((oldSkills) => [...oldSkills, e.target.value]);
      setAllSkills(allSkills.filter((skill) => skill !== e.target.value));
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
      setAllSkills((oldSkills) => [e.target.value, ...oldSkills]);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Technologies</h2>
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
            ? filteredSkills.slice(0, 10).map((skill, index) => (
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
            : allSkills.slice(0, 10).map((skill, index) => (
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
      <button className={classes.yellowButton}>Add skill</button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Tech Skills
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default TechSkillsFilter;
