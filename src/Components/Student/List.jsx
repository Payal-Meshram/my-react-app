import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
  TableSortLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import AddStudentModal from "../Pages/AddStudentModal";

import Notification from "../../Common/Notification";

import Counter from '../Pages/counter';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
    tabSize: "small",
    justifyContent: "center",
    // marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer !important",
    },
  },

  tableHeadCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },

  tableContainer: {
    width: "500",
    overflow: "hidden",
    justifyContent: "center",
  },
  // table: {
  //   width: "100%",
  //   height: "70%",
  //   justifyContent: "center",
  // },
  mainGrid: {
    width: "500",
    margin: "20px",
  },
  buttonGrid: {
    float: "right",
    marginRight: "45px",
    justifyContent: "center",
  },
  tableHead: {
    alignItems: "left",
  },
  tablePag: {
    float: "right",
  },
  iconButton: {
    size: "small",
  },
  tableRow: {
    height: 30,
  },
  paper: {
    margin: "50px",
    align: "center",
    float: "right",
    marginRight: "14rem",
  },
}));

const List = () => {
  const counterVal = useSelector(nextState => nextState.Test.counter);
  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(
    () => {
      console.log('counterVal', counterVal);
    },
    [counterVal]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserList();
    }
  }, [isAuthenticated]);

  const getUserList = async () => {
    const resp = await fetchUsers();
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/students/${id}`);
    let newStudent = students.filter((item) => {
      return item.id !== id;
    });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
    setStudents(newStudent);
  };

  return (
    <>
      <Grid className={classes.mainGrid}>
        <Grid className={classes.buttonGrid}>
          <AddStudentModal />
        </Grid>
        <Paper elevation={5} className={classes.paper}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell
                    style={{ width: 100 }}
                    align="center"
                    className={classes.tableHeadCell}
                  >
                    No
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Email
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{student.stuname}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="View">
                            <IconButton className={classes.iconButton}>
                              <Link to={`/view/${student.id}`}>
                                <VisibilityIcon color="primary" size="small" />
                              </Link>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton className={classes.iconButton}>
                              <Link to={`/edit/${student.id}`}>
                                <EditIcon color="primary" />
                              </Link>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              className={classes.iconButton}
                              onClick={() => handleDelete(student.id)}
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={students.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Typography variant="h1" color="initial">{counterVal}</Typography>
      <Counter />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default List;
