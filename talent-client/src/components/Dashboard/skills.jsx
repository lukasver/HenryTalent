import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './Styles/skills.css';
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import {
  getAllSkills,
  editSkill,
  deleteSkill,
} from '../../redux/skillsReducer/Action';
import { useDispatch } from 'react-redux';

function Skills() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const skills = useSelector((store) => store.SkillsReducer.allSkills);
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
    id: null,
    name: null,
    type: null,
  });

  const softSKills = skills.filter((item) => item.type === 'soft');
  const soft =
    softSKills.length > 5 ? classes.softListScroll : classes.softListItems;

  const techSkills = skills.filter((item) => item.type === 'tech');
  const tech =
    techSkills.length > 5 ? classes.techListScroll : classes.techListItems;

  const otherSkills = skills.filter((item) => item.type === 'other');
  const other =
    otherSkills.length > 5 ? classes.otherListScroll : classes.otherListItems;

  const handleEdit = async (e) => {
    e.preventDefault();
    let editedSkill = {
      name: skill.name,
      type: skill.type,
    };
    const resp = await dispatch(editSkill(skill.id, editedSkill));
    if (resp === 200) {
      handleClose();
      await Swal.fire('Skill edited successfully!');
      dispatch(getAllSkills());
    } else {
      handleClose();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleDelete = async (id) => {
    const alert = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (alert.isConfirmed) {
      const resp = await dispatch(deleteSkill(id));
      if (resp === 200) {
        await Swal.fire('Deleted!', 'The skill has been deleted.', 'success');
        dispatch(getAllSkills());
      }
    }
  };

  const handleOpen = async (id) => {
    const getSkill = await skills.filter((item) => item.id === id);
    setSkill({
      id: getSkill[0].id,
      name: getSkill[0].name,
      type: getSkill[0].type,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    setSkill({
      ...skill,
      name: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setSkill({
      ...skill,
      type: e.target.value,
    });
  };

  const Table = (props) => {
    return (
      <div className={classes.list}>
        <h2 className={classes.title}>{props.title}</h2>
        <div className={props.styled}>
          {props.type.map((item) => (
            <div className={classes.listItem}>
              <p className={classes.text}>{item.name}</p>
              <div className={classes.iconContainer}>
                <EditIcon
                  className={classes.icon}
                  onClick={() => {
                    handleOpen(item.id);
                  }}
                />
                <DeleteIcon
                  className={classes.icon}
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EditSkillModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <h1>Editar Skill</h1>
          <div className={classes.form}>
            <label className={classes.label}>Nombre:</label>
            <input
              className={classes.input}
              type="text"
              name="name"
              value={skill.name}
              onChange={handleInput}
            />
            <label for="type" className={classes.label}>
              Tipo:
            </label>
            <select
              className={classes.input}
              name="type"
              id="type"
              value={skill.type}
              onChange={handleSelect}
            >
              <option value="tech">Tech</option>
              <option value="soft">Soft</option>
              <option value="other">Other</option>
            </select>
            <input
              type="submit"
              className={classes.button}
              value="Guardar Cambios"
              onClick={handleEdit}
            />
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className={classes.container}>
      <Table title="Tech Skills" styled={tech} type={techSkills} />
      <Table title="Soft Skills" styled={soft} type={softSKills} />
      <Table title="Other Skills" styled={other} type={otherSkills} />
      <EditSkillModal />
    </div>
  );
}

export default Skills;
