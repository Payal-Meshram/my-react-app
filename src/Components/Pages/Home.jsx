import {
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
import PersonIcon from "@material-ui/icons/Person";
import validation from "../validation";
import Notification from "../../Common/Notification";
// import List from "../Student/List";

import React, { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "8px",
    },
  },
  paperStyle: {
    height: "50vh",
    width: 300,
    margin: "auto",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
    marginBottom: "5px",
  },
  heading: {
    margin: "10px",
  },
  button: {
    width: "100%",
  },
  mainGrid: {
    margin: "16px",
    padding: "10px",
    alignItems: "center",
  },
  textField: {
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "10px",
  },
});

const Home = () => {
  const classes = useStyles();
  const [student, setStudent] = useState({ stuname: "", email: "" });

  const [errors, setErrors] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [status, setStatus] = useState();

  useEffect(() => {
    console.log("All states", student, errors, notify);
  });

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    // console.log(student);
  }

  async function onFormSubmit(e) {
    const isError = validation(student);
    if (isError) {
      setErrors(isError);
      return;
    }

    try {
      const data = await axios.post(`http://localhost:3000/students`, student);
      // console.log(data);
      if (data) {
        setNotify({
          isOpen: true,
          message: "User Created Successfully",
          type: "success",
        });
        setStatus(true);
      }
    } catch (error) {
      console.log("Something is wrong");
    }
  }

  if (status) {
    return <Home />;
  }

  return (
    <>
      <Grid className={classes.mainGrid}>
        <Paper className={classes.paperStyle} elevation={0}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <PersonIcon />
            </Avatar>

            <h2 className={classes.heading}>Add Student</h2>
          </Grid>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} p={2}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="filled"
                  required
                  id="stuname"
                  label="Name"
                  value={student.stuname}
                  className={classes.textField}
                  onChange={(e) => onTextFieldChange(e)}
                  error={errors && errors.stuname}
                  helperText={errors && errors.stuname ? errors.stuname : ""}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="filled"
                  required
                  id="email"
                  label="Email"
                  value={student.email}
                  className={classes.textField}
                  onChange={(e) => onTextFieldChange(e)}
                  error={errors && errors.email}
                  helperText={errors && errors.email ? errors.email : ""}
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
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {/* <Grid item md={6} xs={12}>
          <List />
        </Grid> */}
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Home;
