import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ColorizeIcon from "@material-ui/icons/Colorize";
import Notification from "../../Common/Notification";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },

  textField: {
    width: "100%",
  },
  paperStyle: {
    padding: "20px",
    height: "75vh",
    width: 400,
    margin: "0 auto",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
  },
  heading: {
    margin: "10px",
  },
  button: {
    width: "100%",
  },
  mainGrid: {
    margin: "20px",
    padding: "10px",
    alignItems: "center",
  },
});

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3000/students/${id}`);

        setStudent(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${id}`, student);

      history.push("/");
    } catch (error) {
      console.log("Something is wrong");
    }
  }

  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <Grid className={classes.mainGrid}>
        <Paper className={classes.paperStyle} elevation={5}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <ColorizeIcon />
            </Avatar>
            <h2 className={classes.heading}>Edit Student</h2>
          </Grid>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} p={2}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  id="id"
                  label="ID"
                  autoFocus
                  value={id}
                  disabled
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  id="stuname"
                  label="Name"
                  value={student.stuname}
                  className={classes.textField}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  id="email"
                  label="Email"
                  value={student.email}
                  className={classes.textField}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <Box textAlign="center">
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(e) => onFormSubmit(e)}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} p={2}>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClick}
                  >
                    Back To Home
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Edit;
