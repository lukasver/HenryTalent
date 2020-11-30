import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Comments(props) {
  const users = useSelector((store) => store.UsersReducer.allUsers);
  const EDIT_COMMENT_CLICK_ACTION = 'editComment';
  const DELETE_COMMENT_CLICK_ACTION = 'deleteComment';
  const findUser = (id) => {
    const user = users.find((user) => user.id === id);
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h1> Comentarios Internos </h1>
              </TableCell>
              <TableCell align="center">
                <h1> Comentario para reclutador </h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows &&
              props.rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row &&
                      row.selectorComents.map((campo) => (
                        <div>
                          <h3 style={{ backgroundColor: '#cfd1d2' }}>
                            {' '}
                            {campo && findUser(campo.userId)}{' '}
                          </h3>
                          <TableRow>
                            <label>{campo && campo.content}</label>
                            <EditIcon
                              onClick={() =>
                                props.handleClickOpen(
                                  campo.id,
                                  EDIT_COMMENT_CLICK_ACTION
                                )
                              }
                            />
                            <DeleteIcon
                              onClick={() =>
                                props.handleClickOpen(
                                  campo.id,
                                  DELETE_COMMENT_CLICK_ACTION
                                )
                              }
                            />
                          </TableRow>
                        </div>
                      ))}{' '}
                  </TableCell>
                  <h3 style={{ backgroundColor: '#cfd1d2' }}>
                    {' '}
                    {row.commentForRecruiter &&
                      findUser(row.commentForRecruiter.userId)}{' '}
                  </h3>

                  {row.commentForRecruiter &&
                  row.commentForRecruiter.content ? (
                    <div>
                      <label>
                        {row.commentForRecruiter &&
                          row.commentForRecruiter.content}
                      </label>
                      <EditIcon
                        onClick={() =>
                          props.handleClickOpen(
                            row.commentForRecruiter.id,
                            EDIT_COMMENT_CLICK_ACTION
                          )
                        }
                      />
                      <DeleteIcon
                        onClick={() =>
                          props.handleClickOpen(
                            row.commentForRecruiter.id,
                            DELETE_COMMENT_CLICK_ACTION
                          )
                        }
                      />
                    </div>
                  ) : (
                    <div> </div>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
